<script>
    import SessionStore from '../SessionStore';
    import StartSessionModal from './components/StartSessionModal.svelte';
    import FinishedSessionModal from './components/FinishedSessionModal.svelte';
    import ActivitiesModal from './components/ActivitiesModal.svelte';
    import CustomizationModal from './components/CustomizationModal.svelte';
    import AboutModal from './components/AboutModal.svelte';
    import { writable } from 'svelte/store';
    import Modal from 'svelte-simple-modal';

    const modal = writable(null);
    let currModal = "";
    let counter = 0;

    setInterval(() => {
        if (currModal != $SessionStore.modalType || counter != $SessionStore.counter) {
            if ($SessionStore.modalType == "") {
                modal.set(null);
            }
            if ($SessionStore.modalType == "start") {
                // @ts-ignore
                modal.set(StartSessionModal);
            }
            if ($SessionStore.modalType == "finished") {
                // @ts-ignore
                modal.set(FinishedSessionModal);
            }
            if ($SessionStore.modalType == "activities") {
                // @ts-ignore
                modal.set(ActivitiesModal);
            }
            if ($SessionStore.modalType == "customization") {
                // @ts-ignore
                modal.set(CustomizationModal);
            }
            if ($SessionStore.modalType == "about") {
                // @ts-ignore
                modal.set(AboutModal);
            }
            currModal = $SessionStore.modalType;
            counter = $SessionStore.counter;
        }
    }, 100);
</script>

<Modal show={$modal}></Modal>