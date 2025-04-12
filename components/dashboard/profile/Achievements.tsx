import React from 'react';
import {Award, Sparkles} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {achievements} from "@/constants";
import {Progress} from "@/components/ui/progress";

const Achievements = () => {
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
                    {achievements.slice(0, 4).map((achievement, index) => (
                        <div
                            key={index}
                            className={`border rounded-lg p-4 ${
                                achievement.unlocked ? "border-coffee-200" : "border-gray-200 opacity-60"
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className={`w-12 h-12 rounded-full ${
                                        achievement.unlocked ? achievement.iconBg : "bg-gray-100"
                                    } flex items-center justify-center`}
                                >
                                    <achievement.icon
                                        className={`h-6 w-6 ${achievement.unlocked ? achievement.iconColor : "text-gray-400"}`}
                                    />
                                </div>

                                <div>
                                    <h4 className="font-medium text-coffee-900">{achievement.name}</h4>
                                    <p className="text-sm text-coffee-700 mt-1">{achievement.description}</p>

                                    {achievement.unlocked ? (
                                        <div
                                            className="flex items-center gap-1 text-green-600 text-sm mt-2">
                                            <Sparkles className="h-3 w-3"/>
                                            <span>Unlocked on {achievement.unlockedDate}</span>
                                        </div>
                                    ) : (
                                        <div className="mt-2">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-coffee-600">Progress</span>
                                                <span
                                                    className="text-coffee-800">{achievement.progress}%</span>
                                            </div>
                                            <Progress value={achievement.progress} className="h-1.5"/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievement Showcase */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-coffee-900">Achievement Showcase</h3>
                    <Button variant="outline" size="sm" className="border-coffee-200">
                        Edit Showcase
                    </Button>
                </div>

                <div
                    className="bg-gradient-to-br from-coffee-50 to-coffee-100 rounded-lg p-6 border border-coffee-200">
                    <div className="flex flex-wrap justify-center gap-4">
                        {achievements
                            .filter((a) => a.unlocked && a.featured)
                            .map((achievement, index) => (
                                <div
                                    key={index}
                                    className="w-24 h-24 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center p-2 border border-coffee-200"
                                >
                                    <div
                                        className={`w-12 h-12 rounded-full ${achievement.iconBg} flex items-center justify-center mb-2`}
                                    >
                                        <achievement.icon
                                            className={`h-6 w-6 ${achievement.iconColor}`}/>
                                    </div>
                                    <div
                                        className="text-xs font-medium text-coffee-900 text-center">{achievement.name}</div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Achievements;
