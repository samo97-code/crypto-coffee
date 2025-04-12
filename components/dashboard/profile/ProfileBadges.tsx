import React from 'react';
import {Badge} from "@/components/ui/badge";
import {Award, Coffee, Droplets, Zap} from "lucide-react";

const ProfileBadges = () => {
    return (
        <div className="mt-4 flex flex-wrap gap-3">
            <Badge className="bg-coffee-100 text-coffee-800 border-none px-3 py-1 shadow-sm">
                <Coffee className="h-3 w-3 mr-1"/>
                Coffee Supporter
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 border-none px-3 py-1 shadow-sm">
                <Award className="h-3 w-3 mr-1"/>
                Early Adopter
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 border-none px-3 py-1 shadow-sm">
                <Zap className="h-3 w-3 mr-1"/>
                SuperChain Explorer
            </Badge>
            <Badge className="bg-green-100 text-green-800 border-none px-3 py-1 shadow-sm">
                <Droplets className="h-3 w-3 mr-1"/>
                Generous Brewer
            </Badge>
        </div>
    );
};

export default ProfileBadges;
