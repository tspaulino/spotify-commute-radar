import querystring from 'querystring'

const BASIC_AUTH_TOKEN = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

export function prepareAuthorizationURL() {
  if (process.env.SPOTIFY_AUTHORIZE_ENDPOINT !== undefined) {
    const authorize_url = new URL(process.env.SPOTIFY_AUTHORIZE_ENDPOINT.toString())
    authorize_url.searchParams.append('client_id', process.env.SPOTIFY_CLIENT_ID)
    authorize_url.searchParams.append('response_type', 'code')
    authorize_url.searchParams.append('scope', 'playlist-modify-public user-follow-read user-library-read user-top-read')
    authorize_url.searchParams.append('redirect_uri', process.env.SPOTIFY_CALLBACK_ENDPOINT)

    return authorize_url.toString()
  }
}


export async function getToken(code) {
  const bodyRequest = new URLSearchParams()
  bodyRequest.append('code', code)
  bodyRequest.append('redirect_uri', process.env.SPOTIFY_CALLBACK_ENDPOINT)
  bodyRequest.append('grant_type', 'authorization_code')

  const res = await fetch(process.env.SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${BASIC_AUTH_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: bodyRequest
  })

  const data = await res.json()
  return data
}


export async function refreshToken(token) {
  const response = await fetch(process.env.SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${BASIC_AUTH_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: token
    })
  });

  return response.json();
};

export async function topArtists(token) {
  const topArtistsURL = new URL(process.env.SPOTIFY_FOLLOWING_ARTISTS_ENDPOINT.toString())
  topArtistsURL.searchParams.append('type', 'artist')

  const res = await fetch(topArtistsURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()
  return data.artists
}

export async function lastReleases(token) {
  const searchURL = new URL(process.env.SPOTIFY_SEARCH_ENDPOINT.toString())
  searchURL.searchParams.append('q', 'tag:new')
  searchURL.searchParams.append('type', 'album')

  const res = await fetch(searchURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()
  return data.albums
}

export async function fetchProfile(token) {
  const profileURL = new URL(process.env.SPOTIFY_PROFILE_ENDPOINT.toString())

  const res = await fetch(profileURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()
  return data
}

export async function publicPlaylists(token) {
  const playlistsURL = new URL(process.env.SPOTIFY_PLAYLISTS_ENDPOINT.toString())

  const res = await fetch(playlistsURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()
  return data
}

export async function createPlaylist(token, userId, name) {
  const createPlaylistURL = new URL(`${process.env.SPOTIFY_BASE_API_URL.toString()}/users/${userId}/playlists`)

  const res = await fetch(createPlaylistURL.toString(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      description: "Powered by Commute Radar!",
      public: true
    })
  })

  const data = await res.json()
  return data
};

export async function updatePlaylist(token, id, tracks = []) {
  const updatePlaylistURL = new URL(`${process.env.SPOTIFY_BASE_API_URL.toString()}/playlists/${id}/tracks`)


  updatePlaylistURL.searchParams.append('uris', tracks)
  const res = await fetch(updatePlaylistURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'uris': tracks })
  })

  const data = await res.json()

  return data
};

export async function fetchAlbum(token, albumURI) {
  const playlistsURL = new URL(albumURI.toString())

  const res = await fetch(playlistsURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()
  return data
}