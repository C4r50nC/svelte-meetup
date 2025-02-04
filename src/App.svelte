<script>
  import Header from './UI/Header.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';
  import TextInput from './UI/TextInput.svelte';

  let title = '';
  let subtitle = '';
  let address = '';
  let email = '';
  let description = '';
  let imageUrl = '';

  let meetups = [
    {
      id: 'm1',
      title: 'Coding Bootcamp',
      subtitle: 'Learn to code in 2 hours',
      description: 'Descriptions for coding bootcamp',
      imageUrl: 'coding image',
      address: 'Dummy Address Road, 4242',
      contactEmail: 'code@test.com',
    },
    {
      id: 'm2',
      title: 'Swim Together',
      subtitle: "Let's go for some swimming",
      description: 'Descriptions for swim together',
      imageUrl: 'swimming image',
      address: 'Dummy Address Road, 1234',
      contactEmail: 'swim@test.com',
    },
  ];

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      contactEmail: email,
    };

    meetups = [newMeetup, ...meetups];
  }
</script>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <TextInput
      id="title"
      label="Title"
      type="text"
      value={title}
      on:input={(event) => (title = event.target.value)}
    />
    <TextInput
      id="subtitle"
      label="Subtitle"
      type="text"
      value={subtitle}
      on:input={(event) => (subtitle = event.target.value)}
    />
    <TextInput
      id="address"
      label="Address"
      type="text"
      value={address}
      on:input={(event) => (address = event.target.value)}
    />
    <TextInput
      id="image-url"
      label="Image URL"
      type="text"
      value={imageUrl}
      on:input={(event) => (imageUrl = event.target.value)}
    />
    <TextInput
      id="email"
      label="E-Mail"
      type="email"
      value={email}
      on:input={(event) => (email = event.target.value)}
    />
    <TextInput
      id="description"
      label="description"
      value={description}
      rows="3"
      controlType="textarea"
      on:input={(event) => (description = event.target.value)}
    />
    <button type="submit">Save</button>
  </form>

  <MeetupGrid {meetups} />
</main>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>
