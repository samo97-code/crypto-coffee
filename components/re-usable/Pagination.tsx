import React, {FC} from 'react';
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface IProps {
    itemsPerPage: number;
    currentPage: number;
    dataLength: number;
    total: number;
    totalPages: number;
    setCurrentPage: (b: number) => void
    fetchData: (b: number) => void
}

const Pagination: FC<IProps> = ({
                                    currentPage,
                                    totalPages,
                                    itemsPerPage,
                                    total,
                                    dataLength,
                                    setCurrentPage,
                                    fetchData
                                }) => {

    const goToPage = async (page: number) => {
        setCurrentPage(page)
        fetchData(page)
    }

    const goToPreviousPage = async () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            fetchData(currentPage - 1)
        }
    }

    const goToNextPage = async () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            fetchData(currentPage + 1)
        }
    }

    const renderPageNumbers = () => {
        const pages = [];
        const pageRange = 1; // how many pages to show before/after current
        const dot = <span className="px-2 text-coffee-500 text-sm select-none">…</span>;

        const left = Math.max(currentPage - pageRange, 2);
        const right = Math.min(currentPage + pageRange, totalPages - 1);

        // Always show page 1
        pages.push(
            <Button
                key={1}
                size="icon"
                onClick={() => goToPage(1)}
                className={`h-8 w-8 min-w-[2rem] px-0 border border-coffee-600 transition-colors ${
                    currentPage === 1
                        ? 'bg-coffee-700 text-white hover:bg-coffee-700 dark:bg-coffee-50/70 dark:hover:bg-coffee-50/60'
                        : 'text-coffee-700 hover:bg-coffee-50 bg-white dark:bg-coffee-50/40 dark:hover:bg-coffee-50/60'
                }`}
            >
                1
            </Button>
        );

        // Left ellipsis
        if (left > 2) {
            pages.push(<span key="left-dots">{dot}</span>);
        }

        // Pages between ellipses
        for (let i = left; i <= right; i++) {
            pages.push(
                <Button
                    key={i}
                    size="icon"
                    onClick={() => goToPage(i)}
                    className={`h-8 w-8 min-w-[2rem] px-0 border border-coffee-600 transition-colors ${
                        currentPage === i
                            ? 'bg-coffee-700 text-white hover:bg-coffee-700 dark:bg-coffee-50/70 dark:hover:bg-coffee-50/60'
                            : 'text-coffee-700 hover:bg-coffee-50 bg-white dark:bg-coffee-50/40 dark:hover:bg-coffee-50/60'
                    }`}
                >
                    {i}
                </Button>
            );
        }

        // Right ellipsis
        if (right < totalPages - 1) {
            pages.push(<span key="right-dots">{dot}</span>);
        }

        // Always show last page if totalPages > 1
        if (totalPages > 1) {
            pages.push(
                <Button
                    key={totalPages}
                    size="icon"
                    onClick={() => goToPage(totalPages)}
                    className={`h-8 w-8 min-w-[2rem] px-0 border border-coffee-600 transition-colors ${
                        currentPage === totalPages
                            ? 'bg-coffee-700 text-white hover:bg-coffee-700 dark:bg-coffee-50/70 dark:hover:bg-coffee-50/60'
                            : 'text-coffee-700 hover:bg-coffee-50 bg-white dark:bg-coffee-50/40 dark:hover:bg-coffee-50/60'
                    }`}
                >
                    {totalPages}
                </Button>
            );
        }

        return pages;
    };

    return (
        <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-coffee-600">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, dataLength)} to{" "}
                {Math.min(currentPage * itemsPerPage, dataLength)} of {total}{" "}
                transactions
            </div>

            <div className="flex items-center space-x-1">
                <Button
                    variant="default"
                    size="icon"
                    className="h-8 w-8 border border-coffee-600 bg-white dark:bg-coffee-50/40 hover:bg-coffee-50 dark:hover:bg-coffee-50/60 transition-colors"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4 text-coffee-700"/>
                </Button>

                {renderPageNumbers()}

                <Button
                    variant="default"
                    size="icon"
                    className="h-8 w-8 border border-coffee-600 bg-white dark:bg-coffee-50/40 hover:bg-coffee-50 dark:hover:bg-coffee-50/60 transition-colors"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4 text-coffee-700"/>
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
