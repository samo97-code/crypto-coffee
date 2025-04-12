import React from 'react';
import {Coffee, History} from "lucide-react";
import {activities} from "@/constants";
import {Button} from "@/components/ui/button";

const Activity = () => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
            <h3 className="font-semibold text-coffee-900 mb-6 flex items-center">
                <History className="h-5 w-5 mr-2"/>
                Recent Activity
            </h3>

            <div className="space-y-6">
                {activities.map((activity, index) => (
                    <div key={index} className="flex gap-4">
                        <div
                            className={`w-10 h-10 rounded-full ${activity.iconBg} flex items-center justify-center shrink-0`}
                        >
                            <activity.icon className={`h-5 w-5 ${activity.iconColor}`}/>
                        </div>

                        <div
                            className="flex-1 border-b border-coffee-100 pb-6 last:border-0 last:pb-0">
                            <div className="flex justify-between">
                                <h4 className="font-medium text-coffee-900">{activity.title}</h4>
                                <div className="flex items-center text-coffee-600 text-sm">
                                    <History className="h-3 w-3 mr-1"/>
                                    {activity.time}
                                </div>
                            </div>
                            <p className="text-coffee-700">{activity.description}</p>

                            {activity.projectDetails && (
                                <div
                                    className="mt-2 flex items-center gap-2 bg-coffee-50 p-2 rounded-lg">
                                    <div
                                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                        <Coffee className="h-4 w-4 text-coffee-700"/>
                                    </div>
                                    <div className="text-sm">
                                        <div
                                            className="font-medium text-coffee-900">{activity.projectDetails.name}</div>
                                        <div
                                            className="text-coffee-600 text-xs">{activity.projectDetails.chain}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-center">
                <Button variant="outline" className="border-coffee-200">
                    View All Activity
                </Button>
            </div>
        </div>
    );
};

export default Activity;
