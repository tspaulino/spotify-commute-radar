import { useAppContext } from "../context/appContext";
import { getToken, topArtists, lastReleases, fetchProfile, publicPlaylists, createPlaylist, updatePlaylist, fetchAlbum } from "../lib/spotify"
import AppContext from '../context/appContext';
import User from '../components/user'

export default function Profile({
  credentials,
  user,
  artists,
  playlists,
  releases
}) {

  const { setAuth, setProfile } = useAppContext()

  setAuth(credentials)
  setProfile(user)

  return (
    <AppContext.Provider credentials={credentials}>
      <User user={user} artists={artists} playlists={playlists} releases={releases} />
    </AppContext.Provider>
  )
}

export const getServerSideProps = async (context) => {
  console.log(context)
  const { code } = context.query


  console.log('Auth not ready yet. Fetching')
  const authData = await getToken(code)
  console.log(authData)


  const { access_token } = authData

  console.log('Profile not ready yet. Fetching')
  const profileData = await fetchProfile(access_token)
  console.log(profileData)

  const artists = await topArtists(access_token)
  console.log(artists)



  const playlists = await publicPlaylists(access_token)
  console.log(playlists)

  const releases = await lastReleases(access_token)
  console.log(releases)

  // const album = await fetchAlbum(access_token, "https://api.spotify.com/v1/albums/2hUo2EROd8BIAtOo1vp3UZ")
  // console.log(album)

  // const newTracks = album.tracks.items.map((track) => track.uri)

  // const newPlaylist = await createPlaylist(access_token, profileData.id, 'An amazing playlist by Commute Radar created right now!')
  // console.log(newPlaylist)

  // const populatedPlaylist = await updatePlaylist(access_token, newPlaylist.id, newTracks)
  // console.log(populatedPlaylist)

  return {
    props: {
      credentials: authData,
      user: profileData,
      // playlists,
      // artists,
      // releases
    }
  }
}