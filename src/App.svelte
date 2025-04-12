<script>
  import Header from './UI/Header.svelte';
  import MeetupDetail from './Meetups/MeetupDetail.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';
  import EditMeetup from './Meetups/EditMeetup.svelte';
  import LoadingSpinner from './UI/LoadingSpinner.svelte';
  import Error from './UI/Error.svelte';

  import meetupStore from './Meetups/meetups-store';

  let meetups = meetupStore;
  let editMode = null;
  let page = 'overview';
  let pageData = {};
  let editedId;
  let isLoading = true;
  let error;

  fetch(
    'https://svelte-http-ad86f-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json'
  )
    .then((res) => {
      if (!res.ok)
        throw new Error('Fetching meetups failed, please try again later!');
      return res.json();
    })
    .then((data) => {
      const loadedMeetups = [];
      for (const key in data) {
        loadedMeetups.push({ ...data[key], id: key });
      }
      setTimeout(() => {
        isLoading = false;
        meetups.setMeetups(loadedMeetups.reverse());
      }, 1000); // Simulate 1 second waiting time
    })
    .catch((err) => {
      error = err;
      isLoading = false;
      console.log(err);
    });

  function savedMeetup(event) {
    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function showDetails(event) {
    page = 'details';
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = 'overview';
    pageData = {};
  }

  function startEdit(event) {
    editMode = 'edit';
    editedId = event.detail;
  }

  function clearError() {
    error = null;
  }
</script>

{#if error}
  <Error message={error.message} on:cancel={clearError} />
{/if}

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEdit} />
    {/if}
    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        meetups={$meetups}
        on:showdetails={showDetails}
        on:edit={startEdit}
        on:add={() => {
          editMode = 'edit';
        }}
      />
    {/if}
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
