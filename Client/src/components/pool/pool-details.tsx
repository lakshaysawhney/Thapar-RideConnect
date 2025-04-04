"use client";

import {
	MapPin,
	Clock,
	Users,
	Car,
	DollarSign,
	UserIcon as Female,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatedButton } from "@/components/ui/animated-button";
import type { Pool } from "@/types/pool";
import { formatTime, formatDate } from "@/lib/utils/date-utils";
import { formatFarePerHead } from "@/lib/utils/pool-utils";

interface PoolDetailsProps {
	pool: Pool | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

/**
 * Pool details dialog component
 */
export function PoolDetails({
	pool,
	open,
	onOpenChange,
}: Readonly<PoolDetailsProps>) {
	if (!pool) return null;

	return (
		<AnimatePresence>
			{open && (
				<Dialog
					open={open}
					onOpenChange={onOpenChange}
				>
					<DialogContent className="sm:max-w-[500px] bg-background/80 backdrop-blur-lg border border-white/20 dark:border-white/10">
						<DialogHeader>
							<DialogTitle className="text-xl text-primary">
								Pool Details
							</DialogTitle>
							<DialogDescription>
								Created by{" "}
								<span className="font-medium">{pool.createdBy}</span>
							</DialogDescription>
						</DialogHeader>

						<motion.div
							className="space-y-4 py-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h4 className="text-sm font-medium text-muted-foreground">
										Start Point
									</h4>
									<p className="flex items-center gap-1 mt-1">
										<MapPin
											size={16}
											className="text-primary"
										/>
										{pool.startPoint}
									</p>
								</div>
								<div>
									<h4 className="text-sm font-medium text-muted-foreground">
										End Point
									</h4>
									<p className="flex items-center gap-1 mt-1">
										<MapPin
											size={16}
											className="text-primary"
										/>
										{pool.endPoint}
									</p>
								</div>
							</div>

							<Separator className="bg-white/20 dark:bg-white/10" />

							<div className="grid grid-cols-2 gap-4">
								<div>
									<h4 className="text-sm font-medium text-muted-foreground">
										Departure
									</h4>
									<p className="flex items-center gap-1 mt-1">
										<Clock
											size={16}
											className="text-primary"
										/>
										{formatTime(pool.departureTime)}
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										{formatDate(pool.departureTime)}
									</p>
								</div>
								<div>
									<h4 className="text-sm font-medium text-muted-foreground">
										Arrival
									</h4>
									<p className="flex items-center gap-1 mt-1">
										<Clock
											size={16}
											className="text-primary"
										/>
										{formatTime(pool.arrivalTime)}
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										{formatDate(pool.arrivalTime)}
									</p>
								</div>
							</div>

							<Separator className="bg-white/20 dark:bg-white/10" />

							<div className="grid grid-cols-2 gap-4">
								<div>
									<h4 className="text-sm font-medium text-muted-foreground">
										Transport Mode
									</h4>
									<p className="flex items-center gap-1 mt-1">
										<Car
											size={16}
											className="text-primary"
										/>
										{pool.transportMode}
									</p>
								</div>
								<div>
									<h4 className="text-sm font-medium text-muted-foreground">
										Persons
									</h4>
									<p className="flex items-center gap-1 mt-1">
										<Users
											size={16}
											className="text-primary"
										/>
										{pool.currentPersons}/{pool.totalPersons}
									</p>
								</div>
							</div>

							<Separator className="bg-white/20 dark:bg-white/10" />

							<div className="grid grid-cols-2 gap-4">
								<div>
									<h4 className="text-sm font-medium text-muted-foreground">
										Total Fare
									</h4>
									<p className="flex items-center gap-1 mt-1">
										<DollarSign
											size={16}
											className="text-primary"
										/>
										${pool.totalFare}
									</p>
								</div>
								<div>
									<h4 className="text-sm font-medium text-muted-foreground">
										Fare per Person
									</h4>
									<p className="flex items-center gap-1 mt-1">
										<DollarSign
											size={16}
											className="text-primary"
										/>
										{formatFarePerHead(pool)}
									</p>
								</div>
							</div>

							{pool.femaleOnly && (
								<motion.div
									className="bg-pink-50/30 dark:bg-pink-950/30 backdrop-blur-md p-3 rounded-md flex items-center gap-2 mt-2 border border-pink-200/50 dark:border-pink-500/20"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.2 }}
								>
									<Female
										size={18}
										className="text-pink-500"
									/>
									<span className="text-pink-700 dark:text-pink-300 font-medium">
										Female only pool
									</span>
								</motion.div>
							)}

							<div>
								<h4 className="text-sm font-medium text-muted-foreground">
									Description
								</h4>
								<p className="mt-1 text-foreground">
									{pool.description}
								</p>
							</div>
						</motion.div>

						<div className="flex justify-end gap-2 mt-4">
							<Button
								variant="outline"
								onClick={() => onOpenChange(false)}
								className="border-white/20 dark:border-white/10"
							>
								Close
							</Button>
							<AnimatedButton
								className="bg-primary hover:bg-primary/90"
								glowColor="rgba(255, 0, 0, 0.3)"
							>
								Join Pool
							</AnimatedButton>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</AnimatePresence>
	);
}
