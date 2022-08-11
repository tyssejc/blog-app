<script lang="js">
  import { queryStore, gql, setContextClient, getContextClient} from '@urql/svelte';
  import { page } from '$app/stores';
  import client from '../../client';
  setContextClient(client);

  $: currentPost = queryStore({
    client: getContextClient(),
    query: gql`
      query GetPostById($id: ID!) {
        findPostByID(id: $id) {
          _id
          title
          content
          author {
            email
          }
        }
      }
    `,
    variables: { id: $page.params.id }
  });
  
</script>
  
{#if $currentPost.fetching}
<p>Loading...</p>
{:else if $currentPost.error}
<p>Oh no... {$currentPost.error.message}</p>
{:else}
<h2>{$currentPost.data.findPostByID.title}</h2>
<p>By <b>{$currentPost.data.findPostByID.author.email}</b></p>
<p>{$currentPost.data.findPostByID.content}</p>
{/if}