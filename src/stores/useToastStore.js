import { defineStore } from "pinia"
import { ref } from "vue"

export const useToastStore = defineStore('toast', () => {
    const message = ref('')
    const type = ref('success')
    const toggleToast = ref(false)

    const showToast = (smg, t = ' success ') => {

        message.value = smg
        type.value = t
        toggleToast.value = !toggleToast.value

       /*  setTimeout(() => {
            toggleToast.value = !toggleToast.value
        }, 4000) */
    }

    return { message, type, toggleToast, showToast}
})