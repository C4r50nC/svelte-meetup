<script>
  import Header from './UI/Header.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';
  import EditMeetup from './Meetups/EditMeetup.svelte';
  import Button from './UI/Button.svelte';

  import meetupStore from './Meetups/meetups-store';

  let meetups = meetupStore;
  let editMode = null;

  function addMeetup(event) {
    const newMeetup = {
      id: Math.random().toString(),
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      description: event.detail.description,
      imageUrl: event.detail.imageUrl,
      address: event.detail.address,
      contactEmail: event.detail.email,
    };
    meetups = [newMeetup, ...meetups];
    editMode = null;
  }

  function cancelEdit() {
    editMode = null;
  }

  function toggleFavorite(event) {
    const id = event.detail;
    const updatedMeetup = { ...meetups.find((meetup) => meetup.id === id) }; // Create a copy using the spread operator
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;

    const updatedMeetupIndex = meetups.findIndex((meetup) => meetup.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[updatedMeetupIndex] = updatedMeetup;

    meetups = updatedMeetups;
  }
</script>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid meetups={$meetups} on:toggle-favorite={toggleFavorite} />
</main>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>
