import { FriendsMap } from '../components/map/FriendsMap'
import { MapHeaderText } from '../components/map/MapHeaderText'
import { Header } from '../components/shared/Header'
import { SearchBar } from '../components/shared/SearchBar'
import { TabBar } from '../components/shared/TabBar'

export function FriendsScreen({
  onOpenCamera,
  onOpenNote,
  showRevealedPopup,
  onDismissRevealedPopup,
  hideNoteBadge,
}) {
  return (
    <div className="relative flex h-full flex-col bg-bereal-black pb-[95px] pt-12">
      <Header />
      <div className="mt-3">
        <SearchBar />
      </div>

      <MapHeaderText />
      <FriendsMap
        onOpenNote={onOpenNote}
        showRevealedPopup={showRevealedPopup}
        onDismissRevealedPopup={onDismissRevealedPopup}
        hideNoteBadge={hideNoteBadge}
      />

      <TabBar active="friends" onCameraPress={onOpenCamera} />
    </div>
  )
}
