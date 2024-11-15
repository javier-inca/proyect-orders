import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore('toast', () => {
    const message = ref('')
    const type = ref('success')
    const isVisible = ref(false)

    const showToast = (smg, t = ' success ') => {
        message.value = smg
        type.value = t
        isVisible.value = true

        setTimeout(() => {
            isVisible.value = false
        }, 2000)
    }

    return { message, type, isVisible, showToast}
})