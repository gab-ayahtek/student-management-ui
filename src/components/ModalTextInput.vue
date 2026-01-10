<script setup lang="ts">
const props = defineProps<{
    label: string,
    placeholder: string,
    id: string,
    type: string,
}>();

const model = defineModel();
</script>

<template>
    <div>
        <label :for="props.id" class="block text-sm font-medium text-slate-300 pb-2">{{ props.label }}</label>
        <input v-model="model" :id="props.id" :type="props.type" :placeholder="props.placeholder" required
            class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-100 placeholder-slate-500" />
    </div>
</template>