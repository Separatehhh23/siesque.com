<script lang="ts">
let isDark = JSON.parse(<string>localStorage.getItem("isdark"));
$: localStorage.setItem("isdark", JSON.stringify(isDark));
</script>


<div class="justify-between">
    <div class="text-text">Theme</div>
    <label class="cursor-pointer grid place-items-center">
        <input
            type="checkbox"
            checked={isDark}
            on:change={() => isDark = !isDark}
            class="toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2"
        />
    </label>
</div>
