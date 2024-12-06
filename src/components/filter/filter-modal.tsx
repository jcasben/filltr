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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const scrollbarStyles = `
  .scrollable-select {
    max-height: 200px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
  }
  .scrollable-select::-webkit-scrollbar {
    width: 6px;
  }
  .scrollable-select::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .scrollable-select::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 20px;
    border: 3px solid #f1f1f1;
  }
`

interface FilterModalProps {
    isOpen: boolean
    onClose: () => void
    onApplyFilters: (filters: FilterOptions) => void
}

export interface FilterOptions {
    startDate: DateFields | undefined
    endDate: DateFields | undefined
    twitter: boolean
    facebook: boolean
    instagram: boolean
    linkedin: boolean
}

interface DateFields {
    day: string
    month: string
    year: string
}

export function FilterModal({ isOpen, onClose, onApplyFilters }: FilterModalProps) {
    const [startDate, setStartDate] = useState<DateFields>({ day: "", month: "", year: "" })
    const [endDate, setEndDate] = useState<DateFields>({ day: "", month: "", year: "" })
    const [twitter, setTwitter] = useState(true)
    const [facebook, setFacebook] = useState(true)
    const [instagram, setInstagram] = useState(true)
    const [linkedin, setLinkedin] = useState(true)

    const handleApplyFilters = () => {
        onApplyFilters({
            startDate: startDate.day && startDate.month && startDate.year ? startDate : undefined,
            endDate: endDate.day && endDate.month && endDate.year ? endDate : undefined,
            twitter,
            facebook,
            instagram,
            linkedin,
        })
        onClose()
    }

    const resetDateFilter = () => {
        setStartDate({ day: "", month: "", year: "" });
        setEndDate({ day: "", month: "", year: "" });
    }

    const generateOptions = (start: number, end: number) => {
        return Array.from({ length: end - start + 1 }, (_, i) => {
            const value = (start + i).toString().padStart(2, '0')
            return <SelectItem key={value} value={value}>{value}</SelectItem>
        })
    }

    const months = [
        "01", "02", "03", "04", "05", "06",
        "07", "08", "09", "10", "11", "12"
    ]

    const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString())

    return (
        <>
            <style jsx>{scrollbarStyles}</style>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[450px] bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle>Filter Options</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        {/* Start Date Filters */}
                        <div>
                            <Label>Start Date</Label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                <div>
                                    <Label className="text-xs mb-1">Day</Label>
                                    <Select value={startDate.day} onValueChange={(value) => setStartDate({ ...startDate, day: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Day" />
                                        </SelectTrigger>
                                        <SelectContent className="scrollable-select">
                                            {generateOptions(1, 31)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-xs mb-1">Month</Label>
                                    <Select value={startDate.month} onValueChange={(value) => setStartDate({ ...startDate, month: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Month" />
                                        </SelectTrigger>
                                        <SelectContent className="scrollable-select">
                                            {months.map(month => (
                                                <SelectItem key={month} value={month}>{month}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-xs mb-1">Year</Label>
                                    <Select value={startDate.year} onValueChange={(value) => setStartDate({ ...startDate, year: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Year" />
                                        </SelectTrigger>
                                        <SelectContent className="scrollable-select">
                                            {years.map(year => (
                                                <SelectItem key={year} value={year}>{year}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* End Date Filters */}
                        <div>
                            <Label>End Date</Label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                <div>
                                    <Label className="text-xs mb-1">Day</Label>
                                    <Select value={endDate.day} onValueChange={(value) => setEndDate({ ...endDate, day: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Day" />
                                        </SelectTrigger>
                                        <SelectContent className="scrollable-select">
                                            {generateOptions(1, 31)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-xs mb-1">Month</Label>
                                    <Select value={endDate.month} onValueChange={(value) => setEndDate({ ...endDate, month: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Month" />
                                        </SelectTrigger>
                                        <SelectContent className="scrollable-select">
                                            {months.map(month => (
                                                <SelectItem key={month} value={month}>{month}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-xs mb-1">Year</Label>
                                    <Select value={endDate.year} onValueChange={(value) => setEndDate({ ...endDate, year: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Year" />
                                        </SelectTrigger>
                                        <SelectContent className="scrollable-select">
                                            {years.map(year => (
                                                <SelectItem key={year} value={year}>{year}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Social Networks Filter */}
                        <div>
                            <Label>Social Networks</Label>
                            <div className="mt-2 flex flex-wrap gap-2">
                                <Button
                                    variant={twitter ? "default" : "outline"}
                                    className="px-3 py-1 text-sm"
                                    onClick={() => setTwitter(!twitter)}>
                                    Twitter
                                </Button>
                                <Button
                                    variant={facebook ? "default" : "outline"}
                                    className="px-3 py-1 text-sm"
                                    onClick={() => setFacebook(!facebook)}>
                                    Facebook
                                </Button>
                                <Button
                                    variant={instagram ? "default" : "outline"}
                                    className="px-3 py-1 text-sm"
                                    onClick={() => setInstagram(!instagram)}>
                                    Instagram
                                </Button>
                                <Button
                                    variant={linkedin ? "default" : "outline"}
                                    className="px-3 py-1 text-sm"
                                    onClick={() => setLinkedin(!linkedin)}>
                                    LinkedIn
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex w-full justify-between">
                            <Button
                                variant="outline"
                                onClick={resetDateFilter}
                                className="w-1/2 mr-2"
                            >
                                Reset Date
                            </Button>
                            <Button
                                variant="default"
                                onClick={handleApplyFilters}
                                className="w-1/2 ml-2 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Apply Filters
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

