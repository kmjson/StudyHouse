<script>
    import SessionStore from '../SessionStore';
    import StartSessionModal from './components/StartSessionModal.svelte';
    import FinishedSessionModal from './components/FinishedSessionModal.svelte';
    import ActivitiesModal from './components/ActivitiesModal.svelte';
    import InventoryModal from './components/InventoryModal.svelte';
    import StoreModal from './components/StoreModal.svelte';
    import DailyRewardModal from './components/DailyRewardModal.svelte';
    import AboutModal from './components/AboutModal.svelte';
    import FriendsModal from './components/FriendsModal.svelte';
    import ProfileModal from './components/ProfileModal.svelte';
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
            if ($SessionStore.modalType == "inventory") {
                // @ts-ignore
                modal.set(InventoryModal);
            }
            if ($SessionStore.modalType == "store") {
                // @ts-ignore
                modal.set(StoreModal);
            }
            if ($SessionStore.modalType == "daily") {
                // @ts-ignore
                modal.set(DailyRewardModal);
            }
            if ($SessionStore.modalType == "about") {
                // @ts-ignore
                modal.set(AboutModal);
            }
            if ($SessionStore.modalType == "friends") {
                // @ts-ignore
                modal.set(FriendsModal);
            }
            if ($SessionStore.modalType == "profile") {
                // @ts-ignore
                modal.set(ProfileModal);
            }
            currModal = $SessionStore.modalType;
            counter = $SessionStore.counter;
        }
    }, 100);
</script>

<Modal show={$modal}></Modal>