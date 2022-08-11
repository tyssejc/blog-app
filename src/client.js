import { createClient } from '@urql/svelte';

export default createClient({
  url: 'https://graphql.us.fauna.com/graphql',

  // For DB in other zone use the following url
    // EU: https://graphql.eu.fauna.com/graphql
  // Classic: https://graphql.fauna.com/graphql

  fetchOptions: () => {
    const token = import.meta.env.VITE_PUBLIC_FAUNA_KEY;
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
}); 