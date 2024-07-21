<script lang="ts">
  import JSZip from "jszip";
  import { File, Form } from "./ui";

  let file;
  let senders = new Map();
  let sendersHtml = "";
  let showStats = false;
  let loading = false;

  function getAuthor(splitDate: string[]): [string, string] {
    let author = "";

    for (const index in splitDate) {
      const frag = splitDate[index];

      if (index === "0") continue;
      if (frag.includes(":")) {
        author += splitDate[index]?.split(":")[0];
        break;
      }
      author += `${frag}-`;
    }

    if (author.endsWith("-")) {
      author = author.replace("-", "");
    }

    const text = splitDate
      .reduce((previousValue, currentValue) => previousValue + currentValue)
      .split(author.replace("-", "").trim())
      .filter((_, i) => i > 0)
      .join("");

    return [author, text];
  }

  async function processFile(data: string) {
    let dm = false;

    const messages = data.split("\n");

    if (messages[0].startsWith("[")) {
      dm = true;
    }

    const splitMessages = messages.map((msg, i) => {
      const splitDate = msg.split(dm ? "]" : "-");
      const splitAuthor = splitDate[1]?.includes(":")
        ? splitDate[1]?.split(":")
        : getAuthor(splitDate);

      const date = splitDate[0].trim();
      const author = splitAuthor[0].trim();
      const text = splitAuthor[1].trim();

      return {
        id: i,
        date,
        author,
        text,
      };
    });

    for (const msg of splitMessages) {
      if (msg.author) {
        if (msg.author.includes("WhatsApp")) continue;

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
    showStats = false;
    loading = true;

    const data = new FormData(event.target);
    const file = data.get("zip") as File;

    await handleFileUpload(file);
  }
</script>

<div class="center my-8 min-h-screen w-screen">
  <div class="rounded-lg bg-base-200 p-8">
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
      <div slot="area">
        {#if showStats}
          <div>
            <h1 class="text-primary">Message amount per user</h1>
            <ul>
              {@html sendersHtml}
            </ul>
          </div>
        {:else if loading}
          <div class="flex w-full flex-row justify-center">
            <span class="loading loading-infinity loading-lg text-accent" />
          </div>
        {/if}
      </div>
    </Form>
  </div>
</div>
