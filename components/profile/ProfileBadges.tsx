import React, {FC} from 'react';
import {Badge} from "@/components/ui/badge";
import {Award, Coffee, Droplets, Zap, Users, Sparkles} from "lucide-react";
import {IBadge} from "@/types";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface IProps {
    badges: IBadge[]
}

const ProfileBadges: FC<IProps> = ({badges}) => {
    const getIconComponent = (iconName: string) => {
        const iconMap = {
            Award: Award,
            Coffee: Coffee,
            Droplets: Droplets,
            Zap: Zap,
            Users: Users,
            Sparkles: Sparkles,
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return iconMap[iconName] || Award
    }

    return (
        <div className="mt-4 flex flex-wrap gap-3">
            {
                badges.map((badge) => {
                    const IconComponent = getIconComponent(badge.icon)

                    return <Badge key={badge.id}
                                  className={`${badge.bg_color} ${badge.text_color} border-none px-3 py-1 shadow-sm`}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center">
                                        <IconComponent className="h-3 w-3 mr-1"/>
                                        {badge.name}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>{badge.description}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Badge>
                })
            }
        </div>
    );
};

export default ProfileBadges;
