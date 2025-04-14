import React, {FC} from 'react';
import {Award, Coffee, Droplets, Sparkles, Users, Zap} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";
import {IUserAchievement} from "@/types";

interface IProps {
    achievements: IUserAchievement[]
}

const Achievements: FC<IProps> = ({achievements}) => {
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
        <div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-coffee-900 flex items-center">
                        <Award className="h-5 w-5 mr-2"/>
                        Your Achievements
                    </h3>

                    <Link href="/profile/achievements">
                        <Button
                            className="bg-gradient-to-r from-coffee-500 to-coffee-700 hover:from-coffee-600 hover:to-coffee-800 text-white">
                            View All Achievements
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.slice(0, 4).map((achievement, index) => {
                            const IconComponent = getIconComponent(achievement.achievement.icon_name)
                            const isUnlocked = achievement.is_unlocked

                            return <div
                                key={index}
                                className={`border rounded-lg p-4 ${
                                    isUnlocked ? "border-coffee-200" : "border-gray-200 opacity-60"
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`w-12 h-12 rounded-full ${
                                            isUnlocked ? achievement.achievement.icon_bg : "bg-gray-100"
                                        } flex items-center justify-center`}
                                    >
                                        <IconComponent
                                            className={`h-6 w-6 ${isUnlocked ? achievement.achievement.icon_color : "text-gray-400"}`}
                                        />
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-coffee-900">{achievement.achievement.name}</h4>
                                        <p className="text-sm text-coffee-700 mt-1">{achievement.achievement.description}</p>

                                        {isUnlocked ? (
                                            <div
                                                className="flex items-center gap-1 text-green-600 text-sm mt-2">
                                                <Sparkles className="h-3 w-3"/>
                                                <span>
                                                  Unlocked on {new Date(achievement.unlocked_at || "").toLocaleDateString()}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="mt-2">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-coffee-600">Progress</span>
                                                    <span
                                                        className="text-coffee-800">
                                                        {Math.round(
                                                            (achievement.progress / achievement.achievement.requirement_value) * 100,
                                                        )}
                                                        %
                                                    </span>
                                                </div>
                                                <Progress value={Math.round(
                                                    (achievement.progress / achievement.achievement.requirement_value) * 100,
                                                )} className="h-1.5"/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        }
                    )}
                </div>
            </div>
        </div>
    );
};

export default Achievements;
