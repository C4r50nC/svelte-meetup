<script>
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  import MeetupItem from './MeetupItem.svelte';
  import MeetupFilter from './MeetupFilter.svelte';
  import Button from '../UI/Button.svelte';

  export let meetups;

  const dispatch = createEventDispatcher();

  let favsOnly = false;

  $: filteredMeetups = favsOnly ? meetups.filter((m) => m.isFavorite) : meetups;

  function setFilter(event) {
    favsOnly = event.detail === 1;
  }
</script>

<section id="meetup-controls">
  <MeetupFilter on:select={setFilter} />
  <Button on:click={() => dispatch('add')}>New Meetup</Button>
</section>

{#if filteredMeetups.length === 0}
  <p id="no-meetups">No meetups found. You can start adding some.</p>
{/if}
<section id="meetups">
  {#each filteredMeetups as meetup (meetup.id)}
    <!-- animate attribute cannot be added in MeetupItem.svelte because svelte only supports adding to direct child -->
    <div transition:scale animate:flip={{ duration: 300 }}>
      <MeetupItem
        id={meetup.id}
        title={meetup.title}
        subtitle={meetup.subtitle}
        imageUrl={meetup.imageUrl}
        description={meetup.description}
        address={meetup.address}
        isFavorite={meetup.isFavorite}
        on:showdetails
        on:edit
      />
    </div>
  {/each}
</section>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  #no-meetups {
    margin: 1rem;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
