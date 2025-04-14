import React, {FC} from 'react';
import {Badge} from "@/components/ui/badge";
import {Award, Coffee, Droplets, Zap, Users, Sparkles} from "lucide-react";
import {IBadge} from "@/types";

interface IProps {
    badges: IBadge[]
}

const ProfileBadges: FC<IProps> = ({badges}) => {
    // Map icon names to Lucide icons
    const getIconComponent = (iconName: string) => {
        const iconMap: Record<string, any> = {
            Award: Award,
            Coffee: Coffee,
            Droplets: Droplets,
            Zap: Zap,
            Users: Users,
            Sparkles: Sparkles,
        }
        return iconMap[iconName] || Award
    }

    return (
        <div className="mt-4 flex flex-wrap gap-3">
            {
                badges.map((badge) => {
                    const IconComponent = getIconComponent(badge.icon)

                    return <Badge key={badge.id} className={`${badge.bg_color} ${badge.text_color} border-none px-3 py-1 shadow-sm`}>
                        <IconComponent className="h-3 w-3 mr-1"/>
                        {badge.name}
                    </Badge>
                })
            }
        </div>
    );
};

export default ProfileBadges;
