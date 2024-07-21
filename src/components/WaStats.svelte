<script lang="ts">
  import JSZip from "jszip";
  import { File, Form } from "./ui";
  import { Simulate } from "react-dom/test-utils";

  let file;
  let senders = new Map();
  let sendersHtml = "";
  let showStats = false;
  let loading = false;

  async function processFile(data: string) {
    const messages = [];
    let dm = false;

    for (const message of data.split("\n")) {
      messages.push(message);
    }

    if (messages[0].startsWith("[")) {
      dm = true;
    }

    const splitMessages = messages.map((msg, i) => {
      const date = msg.split(dm ? "]" : "-")[0].trim();
      const author = msg
        .split(dm ? "]" : "-")[1]
        ?.split(":")[0]
        .trim();
      const text = msg
        .split(dm ? "]" : "-")[1]
        ?.split(":")
        .filter((_, i) => i > 0)
        .join("")
        .trim();

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

    showStats = false;
    loading = true;

    const data = new FormData(event.target);
    const file = data.get("zip") as File;

    await handleFileUpload(file);
  }
</script>

<div class="center h-screen w-screen">
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
