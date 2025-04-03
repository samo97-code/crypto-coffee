import React, {useEffect, useRef, useState} from "react";
import {announcements} from "@/constants";
import {Bell} from "lucide-react";
import {Button} from "@/components/ui/button";

const AnnouncementCard = () => {
    const wrapperRef = useRef(null);
    const [showNews, setShowNews] = useState(false);

    useEffect(() => {
        function handleClickOutside(event: React.MouseEvent<HTMLInputElement>) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowNews(false);
            }
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (

        <div ref={wrapperRef} className="relative">
            <Button variant="ghost" size="icon"
                    className={"bg-coffee-100 hover:bg-coffee-200 rounded-full relative transition-all"}
                    onClick={() => setShowNews(prevState => !prevState)}>
                <Bell className="h-5 w-5"/>
                <span
                    className="flex items-center justify-center absolute -top-[2px] -right-[7px] rounded-full max-h-4.55 h-4.5 min-w-4.5 bg-red-400 text-white p-1 text-xs">{announcements.length}</span>
            </Button>

            {
                showNews && <div
                    className="bg-white shadow-sm border border-coffee-200 backdrop-blur-sm rounded-lg overflow-hidden absolute -left-[140px] sm:-left-[210px] top-[52px] w-[320px]">
                  <div className="p-4 border-b border-coffee-200">
                    <h3 className="font-semibold">Announcements</h3>
                  </div>
                  <div className="p-4 space-y-4">
                      {announcements.map((announcement) => (
                          <div key={announcement.title} className="flex gap-3">
                              <announcement.icon className="h-5 w-5 text-coffee-800 mt-1"/>
                              <div>
                                  <div className="flex items-center gap-2">
                                      <span className="font-medium">{announcement.title}</span>
                                      <span className="text-xs text-muted-foreground">{announcement.date}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{announcement.content}</p>
                              </div>
                          </div>
                      ))}
                  </div>
                </div>
            }

        </div>

    )
}

export default AnnouncementCard

