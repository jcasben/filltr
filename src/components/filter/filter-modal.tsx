"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface FilterModalProps {
    isOpen: boolean
    onClose: () => void
    onApplyFilters: (filters: FilterOptions) => void
}

export interface FilterOptions {
    startDate: string | undefined
    endDate: string | undefined
    twitter: boolean
    facebook: boolean
    instagram: boolean
    linkedin: boolean
}

export function FilterModal({ isOpen, onClose, onApplyFilters }: FilterModalProps) {
    const [startDate, setStartDate] = useState<string | undefined>(undefined)
    const [endDate, setEndDate] = useState<string | undefined>(undefined)
    const [twitter, setTwitter] = useState(true)
    const [facebook, setFacebook] = useState(true)
    const [instagram, setInstagram] = useState(true)
    const [linkedin, setLinkedin] = useState(true)

    const handleApplyFilters = () => {
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (
            (startDate && !dateRegex.test(startDate)) ||
            (endDate && !dateRegex.test(endDate))
        ) {
            alert("Please enter dates in the format dd/mm/yyyy.");
            return;
        }

        onApplyFilters({
            startDate,
            endDate,
            twitter,
            facebook,
            instagram,
            linkedin,
        })
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px] bg-white rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle>Filter Options</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    {/* Date Filters */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="start-date">Start Date (dd/mm/yyyy)</Label>
                            <input
                                id="start-date"
                                type="text"
                                placeholder="dd/mm/yyyy"
                                value={startDate || ""}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="mt-2 w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <Label htmlFor="end-date">End Date (dd/mm/yyyy)</Label>
                            <input
                                id="end-date"
                                type="text"
                                placeholder="dd/mm/yyyy"
                                value={endDate || ""}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="mt-2 w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Social Networks Filter */}
                    <div>
                        <Label>Social Networks</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <Button
                                key="Twitter"
                                variant={twitter ? "default" : "outline"}
                                className="px-3 py-1 text-sm"
                                onClick={() => setTwitter(!twitter)}>
                                Twitter
                            </Button>
                            <Button
                                key="Facebook"
                                variant={facebook ? "default" : "outline"}
                                className="px-3 py-1 text-sm"
                                onClick={() => setFacebook(!facebook)}>
                                Facebook
                            </Button>
                            <Button
                                key="Instagram"
                                variant={instagram ? "default" : "outline"}
                                className="px-3 py-1 text-sm"
                                onClick={() => setInstagram(!instagram)}>
                                Instagram
                            </Button>
                            <Button
                                key="Linkedin"
                                variant={linkedin ? "default" : "outline"}
                                className="px-3 py-1 text-sm"
                                onClick={() => setLinkedin(!linkedin)}>
                                LinkedIn
                            </Button>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="default"
                        onClick={handleApplyFilters}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Apply Filters
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

