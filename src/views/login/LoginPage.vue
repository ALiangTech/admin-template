<template>
  <div>login</div>
</template>
<script setup>
import useHttp from '@/hooks/useHttp';
useHttp('/login', { param: { name: '1234'}})
</script>
