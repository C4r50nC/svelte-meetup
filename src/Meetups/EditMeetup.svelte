<script>
  import { createEventDispatcher } from 'svelte';

  import Button from '../UI/Button.svelte';
  import TextInput from '../UI/TextInput.svelte';
  import Modal from '../UI/Modal.svelte';

  import { isEmpty, isValidEmail } from '../helpers/validation';
  import meetups from './meetups-store';

  let title = '';
  let subtitle = '';
  let address = '';
  let email = '';
  let description = '';
  let imageUrl = '';
  let formIsValid = false;

  export let id = null;
  if (id) {
    const unsubscribe = meetups.subscribe((items) => {
      const selectedMeetup = items.find((i) => i.id === id);
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      address = selectedMeetup.address;
      email = selectedMeetup.contactEmail;
      description = selectedMeetup.description;
      imageUrl = selectedMeetup.imageUrl;
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: emailValid = isValidEmail(email);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    emailValid &&
    descriptionValid &&
    imageUrlValid;

  function submitForm() {
    const newMeetupData = {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      contactEmail: email,
    };

    if (id) {
      meetups.updateMeetup(id, newMeetupData);
    } else {
      fetch(
        'https://svelte-http-ad86f-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json',
        {
          method: 'POST',
          body: JSON.stringify({ ...newMeetupData, isFavorite: false }),
          headers: { 'Content-Type': 'application/json' },
        }
      )
        .then((res) => {
          if (!res.ok) throw new Error('An error occurred, please try again!');
          return res.json();
        })
        .then((data) => {
          meetups.addMeetup({
            ...newMeetupData,
            isFavorite: false,
            id: data.name,
          });
        })
        .catch((err) => console.log(err));
    }

    dispatch('save');
  }

  function cancel() {
    dispatch('cancel');
  }

  function deleteMeetup() {
    meetups.removeMeetup(id);
    dispatch('save');
  }
</script>

<Modal title="Edit Meetup Data" on:cancel>
  <form>
    <TextInput
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter a valid title."
      value={title}
      on:input={(event) => (title = event.target.value)}
    />

    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle"
      value={subtitle}
      on:input={(event) => (subtitle = event.target.value)}
    />

    <TextInput
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter a valid address"
      value={address}
      on:input={(event) => (address = event.target.value)}
    />

    <TextInput
      id="image-url"
      label="Image URL"
      valid={imageUrlValid}
      validityMessage="Please enter a valid image URL"
      value={imageUrl}
      on:input={(event) => (imageUrl = event.target.value)}
    />

    <TextInput
      id="email"
      label="E-Mail"
      type="email"
      valid={emailValid}
      validityMessage="Please enter a valid email"
      value={email}
      on:input={(event) => (email = event.target.value)}
    />

    <TextInput
      id="description"
      label="description"
      valid={descriptionValid}
      validityMessage="Please enter a valid description"
      bind:value={description}
      rows="3"
      controlType="textarea"
    />
  </form>

  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>
      Save
    </Button>
    {#if id}
      <Button type="button" on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
