<template>
  <!-- <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <rect x="17" y="6" width="14" height="9" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round" />
    <rect x="6" y="33" width="14" height="9" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round" />
    <rect x="28" y="33" width="14" height="9" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round" />
    <path d="M24 16V24" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M13 33V24H35V33" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
   </svg> -->
  <!-- <svg width="200" height="40" xmlns="http://www.w3.org/2000/svg">
  <path d="M10,20 L190,20" fill="none" stroke="#333" stroke-width="4">
    <animate attributeName="stroke-dasharray" dur="4s" repeatCount="1" from="0 180" to="180 0" />
  </path>
</svg> -->

  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24,6, L17,6, L17,15, L24,15"
      fill="none"
      stroke="red"
      stroke-width="4"
      stroke-linejoin="round"
    >
      <animate
        attributeName="stroke-dasharray"
        from="0 24"
        to="24 0"
        dur="2s"
        begin="0s"
        fill="freeze"
      />
    </path>
    <path
      d="M24,6, L31,6, L31,15, L24,15"
      fill="none"
      stroke="red"
      stroke-width="4"
      stroke-linejoin="round"
    >
      <animate
        attributeName="stroke-dasharray"
        from="0 24"
        to="24 0"
        dur="2s"
        begin="0s"
        fill="freeze"
      />
    </path>
    <path
      d="M24,15, V24"
      fill="none"
      stroke="transparent"
      stroke-width="4"
      stroke-linejoin="round"
    >
      <animate
        attributeName="stroke-dasharray"
        from="0 45"
        to="45 0"
        dur="2s"
        begin="2s"
        fill="freeze"
      />
      <animate
        attributeName="stroke"
        from="transparent"
        to="red"
        dur="0.1s"
        begin="2s"
        fill="freeze"
      />
    </path>
    <path
      d="M24,24, H9, L9,33"
      fill="none"
      stroke="transparent"
      stroke-width="4"
      stroke-linejoin="round"
    >
      <animate
        attributeName="stroke-dasharray"
        from="0 45"
        to="45 0"
        dur="2s"
        begin="2s"
        fill="freeze"
      />
      <animate
        attributeName="stroke"
        from="transparent"
        to="red"
        dur="0.1s"
        begin="2s"
        fill="freeze"
      />
    </path>
    <path
      d="M24,24, L36 24"
      fill="none"
      stroke="transparent"
      stroke-width="4"
      stroke-linejoin="round"
    >
      <animate
        attributeName="stroke-dasharray"
        from="0 45"
        to="45 0"
        dur="2s"
        begin="2s"
        fill="freeze"
      />
      <animate
        attributeName="stroke"
        from="transparent"
        to="red"
        dur="0.1s"
        begin="2s"
        fill="freeze"
      />
    </path>
    <!-- <path d="M24,24, H9"
     fill="none" stroke="red" stroke-width="4">
     <animate attributeName="stroke-dasharray" from="0 24" to="24 0" dur="2s" begin="0s" fill="freeze" />
    </path> -->
    <!-- <polyline points="24,6 17,6" fill="none" stroke="black"  stroke-width="4" />
    <polyline points="17,6 17,15" fill="none" stroke="black" stroke-width="4" /> -->
    <!-- <rect x="17" y="6" width="14" height="9" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round">
      <animate attributeName="stroke-dasharray" from="0 0" to="14 28" dur="1s" begin="0s" fill="freeze" />
    </rect> -->
    <!-- <rect x="6" y="33" width="14" height="9" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round">
      <animate attributeName="stroke-dasharray" from="0 36" to="36 36" dur="1s" begin="0.5s" fill="freeze" />
    </rect>
    <rect x="28" y="33" width="14" height="9" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round">
      <animate attributeName="stroke-dasharray" from="0 36" to="36 36" dur="1s" begin="1s" fill="freeze" />
    </rect>
    <path d="M24 16V24" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <animate attributeName="stroke-dasharray" from="0 8" to="8 8" dur="1s" begin="1.5s" fill="freeze" />
    </path>
    <path d="M13 33V24H35V33" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <animate attributeName="stroke-dasharray" from="0 22" to="22 22" dur="1s" begin="2s" fill="freeze" />
    </path> -->
  </svg>
</template>
<script setup lang="ts">
defineOptions({
  name: "MenuGraph",
});
</script>
