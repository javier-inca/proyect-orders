import { defineStore } from "pinia"
import { useToast } from "primevue"

export const useToastStore = defineStore('toast', () => {
    const toast = useToast()

    const showToast = (severity, summary, detail) => { 
        toast.removeAllGroups()

        toast.add({
            severity,
            summary,
            detail,
            life: 4000,
        })
    }

    return {showToast}
})