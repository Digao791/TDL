import { ref } from "vue";

const eventBus = ref({})

export function useEventBus(){
    return {
        on(event, callback){
        if(!eventBus.value[event]){
            eventBus.value[event] = []
        }
        eventBus.value[event].push(callback)
        },
        emit(event, data){
            if(eventBus.value[event]){
                eventBus.value[event].forEach((callback) => callback(data))
            }
        }
    }
}