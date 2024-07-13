import { NotificationsNone } from "../Icons"
import { Button } from "../atoms"

export const Notification = () => {
      return (
            <Button variant="ghost" size="icon">
                  <NotificationsNone className="w-[24px] h-[24px]" />
            </Button>
      )
}