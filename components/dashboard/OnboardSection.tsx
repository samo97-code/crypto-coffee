import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Coffee, Heart, Repeat} from "lucide-react";

const OnboardSection = () => {
    return (
        <div>
            <h2 className="text-4xl font-bold text-coffee-900 text-center flex items-center justify-center gap-2 mb-4">
                Support projects with your daily coffee!
                <span role="img" aria-label="coffee cup" className="text-3xl">
            ☕️
          </span>
            </h2>
            <p className="text-coffee-500 text-center mb-8 max-w-3xl mx-auto">
                Send a small fee (like buying a virtual coffee) every morning to support your favorite blockchain
                projects.
                It&#39;s a simple way to show appreciation and help them grow!
            </p>

            <Card className="bg-white border-coffee-200">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div
                                className="w-16 h-16 rounded-full bg-coffee-100 flex items-center justify-center mx-auto mb-4">
                                <Coffee className="h-8 w-8 text-coffee-700"/>
                            </div>
                            <h3 className="font-medium text-coffee-900 mb-2">Small Daily Fee</h3>
                            <p className="text-coffee-500">
                                Send a small amount (like buying a coffee) to support projects you love
                            </p>
                        </div>

                        <div className="text-center">
                            <div
                                className="w-16 h-16 rounded-full bg-coffee-100 flex items-center justify-center mx-auto mb-4">
                                <Repeat className="h-8 w-8 text-coffee-700"/>
                            </div>
                            <h3 className="font-medium text-coffee-900 mb-2">Daily Ritual</h3>
                            <p className="text-coffee-500">Make it part of your morning routine to support your favorite
                                projects</p>
                        </div>

                        <div className="text-center">
                            <div
                                className="w-16 h-16 rounded-full bg-coffee-100 flex items-center justify-center mx-auto mb-4">
                                <Heart className="h-8 w-8 text-coffee-700"/>
                            </div>
                            <h3 className="font-medium text-coffee-900 mb-2">Show Appreciation</h3>
                            <p className="text-coffee-500">
                                Your support helps projects grow and shows your appreciation for their work
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OnboardSection;
