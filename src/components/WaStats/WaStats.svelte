<script lang="ts">
  import JSZip from "jszip";
  import WaStat from "./WaStat.svelte";
  import MiniStat from "./MiniStat.svelte";
  import StatPanel from "./StatPanel.svelte";
  import { File, Form } from "../ui";

  let file;
  let senders = new Map();
  let blocks: string[] = [];
  let unblocks: string[] = [];
  let joins: string[] = [];
  let lefts: string[] = [];
  let admins: string[] = [];
  let unadmins: string[] = [];
  let calls: string[] = [];
  let sendersHtml = "";
  let showStats = false;
  let loading = false;

  function extractParts(
    text: string,
    startChar: string,
    endChar: string,
  ): string[] {
    const pattern = new RegExp(
      `${escapeRegExp(startChar)}(.*?)${escapeRegExp(endChar)}`,
      "g",
    );
    const matches = [];
    let match;

    while ((match = pattern.exec(text)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  }

  function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  async function processFile(data: string) {
    let dm = false;

    const messages = data.split("\n");

    if (messages[0].startsWith("[")) {
      dm = true;
    }

    const splitMessages = messages.map((msg, i) => {
      const dateSeparator = dm ? "]" : "-";
      const date = msg.split(dateSeparator)[0].trim();
      const author = extractParts(msg, dateSeparator, ":")[0]?.trim();
      const text = msg.slice(msg.indexOf(":"))?.trim();

      if (typeof author === "undefined" || typeof text === "undefined") {
        if (
          msg.includes("WhatsApp") || // End-to-end encrypted first message
          msg.includes("N:") || // Poll options
          msg.includes("created") || // Group created
          msg.includes("creado") || // Group created
          msg.includes("icon") || // Icon changes
          msg.includes("name") || // Name changes
          msg.includes("nombre") || // Name changes
          msg.includes("desc") || // Description changes
          msg.includes("pin") || // Pinned messages
          msg.includes("commun") // Useless feature stuff
        ) {
          // Break
        } else if (msg.includes("Tap") || msg.includes("Pulsa")) {
          blocks.push(msg);
        } else if (msg.includes("contact.") || msg.includes("contacto.")) {
          unblocks.push(msg);
        } else if (msg.includes("You're now") || msg.includes("Ahora eres")) {
          admins.push(msg);
        } else if (msg.includes("no longer") || msg.includes("Ya no")) {
          unadmins.push(msg);
        } else if (msg.includes("a call") || msg.includes("una llamada")) {
          calls.push(msg);
        } else if (
          msg.includes("add") ||
          msg.includes("join") ||
          msg.includes("añadido") ||
          msg.includes("entrado")
        ) {
          joins.push(msg);
        } else if (
          msg.includes("left") ||
          msg.includes("removed") ||
          msg.includes("ido") ||
          msg.includes("expulsado")
        ) {
          lefts.push(msg);
        }
      }

      return {
        id: i,
        date,
        author,
        text,
      };
    });

    for (const msg of splitMessages) {
      if (msg.author) {
        if (senders.has(msg.author)) {
          const prev = senders.get(msg.author);
          senders.set(msg.author, prev + 1);
        } else {
          senders.set(msg.author, 1);
        }
      }
    }

    senders.forEach(
      (value, key) =>
        (sendersHtml += `<li><span class="text-secondary">${key}</span> => <span class="text-accent">${value}</span></li>`),
    );

    setTimeout(() => {
      loading = false;
      showStats = true;
    }, 1500);
  }

  async function handleFileUpload(file: File) {
    if (file) {
      const zip = new JSZip();
      const content = await file.arrayBuffer();
      const unzipped = await zip.loadAsync(content);

      let txtFile;
      Object.keys(unzipped.files).forEach((filename) => {
        if (filename.endsWith(".txt")) {
          txtFile = unzipped.files[filename];
        }
      });

      if (txtFile) {
        const textContent = await txtFile.async("text");
        await processFile(textContent);
      } else {
        alert("No .txt file found in the zip");
      }
    } else {
      console.log("No file?");
    }
  }

  async function handleSubmit(event) {
    sendersHtml = "";
    senders = new Map();
    blocks = [];
    unblocks = [];
    calls = [];
    admins = [];
    unadmins = [];
    lefts = [];
    joins = [];
    showStats = false;
    loading = true;

    const data = new FormData(event.target);
    const file = data.get("zip") as File;

    await handleFileUpload(file);
  }
</script>

<div class="center my-8 min-h-screen w-screen">
  <div class="rounded-lg bg-base-200 p-8">
    <div class="flex h-full w-full flex-row justify-around">
      <div>
        <Form
          handle={handleSubmit}
          enctype="multipart/form-data"
          action=""
          method="POST"
          {loading}
        >
          <File
            id="zip"
            accept=".zip"
            required={true}
            disabled={loading}
            label="<span class='text-accent'>.zip</span> export"
          />
        </Form>
        {#if loading}
          <div class="flex w-full flex-row justify-center">
            <span class="loading loading-infinity loading-lg text-accent" />
          </div>
        {/if}
      </div>
      <div>
        {#if showStats}
          <div class="flex flex-col gap-2">
            <StatPanel>
              <MiniStat amount={joins.length}>Joins</MiniStat>
              <MiniStat amount={lefts.length}>Lefts</MiniStat>
              <MiniStat amount={blocks.length}>Blocks</MiniStat>
              <MiniStat amount={unblocks.length}>Unblocks</MiniStat>
              <MiniStat amount={admins.length}>Promotions</MiniStat>
              <MiniStat amount={unadmins.length}>Demotions</MiniStat>
              <MiniStat amount={calls.length}>Calls</MiniStat>
            </StatPanel>
            <StatPanel>
              <WaStat title="Message amount per user">
                {@html sendersHtml}
              </WaStat>
            </StatPanel>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
