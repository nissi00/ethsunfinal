"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2, Trash2, Loader2, Briefcase } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface JobOffer {
    id: string;
    titleFr: string;
    titleEn?: string;
    titleEs?: string;
    descriptionFr: string;
    descriptionEn?: string;
    descriptionEs?: string;
    startDate?: string;
    qualificationsFr?: string;
    qualificationsEn?: string;
    qualificationsEs?: string;
    whyJoinUsFr?: string;
    whyJoinUsEn?: string;
    whyJoinUsEs?: string;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
}

export default function JobsAdminPage() {
    const [jobs, setJobs] = useState<JobOffer[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        titleFr: "",
        titleEn: "",
        titleEs: "",
        descriptionFr: "",
        descriptionEn: "",
        descriptionEs: "",
        startDate: "",
        qualificationsFr: "",
        qualificationsEn: "",
        qualificationsEs: "",
        whyJoinUsFr: "",
        whyJoinUsEn: "",
        whyJoinUsEs: "",
        isActive: true,
        sortOrder: 0,
    });
    const [dialogOpen, setDialogOpen] = useState(false);

    // Load jobs
    const fetchJobs = async () => {
        try {
            const res = await fetch("/api/admin/jobs");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setJobs(data);
        } catch (error) {
            toast.error("Erreur lors du chargement des offres");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.titleFr || !formData.descriptionFr) {
            toast.error("Veuillez remplir les champs obligatoires (FR)");
            return;
        }

        try {
            const method = editingId ? "PUT" : "POST";
            const url = editingId
                ? `/api/admin/jobs/${editingId}`
                : "/api/admin/jobs";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    sortOrder: parseInt(formData.sortOrder.toString()),
                }),
            });

            if (!res.ok) throw new Error("Failed to save");

            toast.success(
                editingId ? "Offre mise à jour" : "Offre créée avec succès"
            );

            resetForm();
            setDialogOpen(false);
            fetchJobs();
        } catch (error) {
            toast.error("Erreur lors de la sauvegarde");
            console.error(error);
        }
    };

    const resetForm = () => {
        setFormData({
            titleFr: "",
            titleEn: "",
            titleEs: "",
            descriptionFr: "",
            descriptionEn: "",
            descriptionEs: "",
            startDate: "",
            qualificationsFr: "",
            qualificationsEn: "",
            qualificationsEs: "",
            whyJoinUsFr: "",
            whyJoinUsEn: "",
            whyJoinUsEs: "",
            isActive: true,
            sortOrder: 0,
        });
        setEditingId(null);
    }

    // Edit job
    const handleEdit = (job: JobOffer) => {
        setFormData({
            titleFr: job.titleFr,
            titleEn: job.titleEn || "",
            titleEs: job.titleEs || "",
            descriptionFr: job.descriptionFr,
            descriptionEn: job.descriptionEn || "",
            descriptionEs: job.descriptionEs || "",
            startDate: job.startDate || "",
            qualificationsFr: job.qualificationsFr || "",
            qualificationsEn: job.qualificationsEn || "",
            qualificationsEs: job.qualificationsEs || "",
            whyJoinUsFr: job.whyJoinUsFr || "",
            whyJoinUsEn: job.whyJoinUsEn || "",
            whyJoinUsEs: job.whyJoinUsEs || "",
            isActive: job.isActive,
            sortOrder: job.sortOrder,
        });
        setEditingId(job.id);
        setDialogOpen(true);
    };

    // Delete job
    const handleDelete = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) return;

        try {
            const res = await fetch(`/api/admin/jobs/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete");

            toast.success("Offre supprimée");
            fetchJobs();
        } catch (error) {
            toast.error("Erreur lors de la suppression");
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin w-8 h-8" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Offres d'Emploi</h1>
                    <p className="text-gray-500">Gérer les opportunités de carrière</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={resetForm}>
                            <Plus className="w-4 h-4 mr-2" />
                            Ajouter une offre
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>
                                {editingId ? "Modifier l'offre" : "Ajouter une offre"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Titre FR */}
                                <div>
                                    <Label htmlFor="titleFr">Titre du poste (FR) *</Label>
                                    <Input
                                        id="titleFr"
                                        value={formData.titleFr}
                                        onChange={(e) =>
                                            setFormData({ ...formData, titleFr: e.target.value })
                                        }
                                    />
                                </div>
                                {/* Date de début */}
                                <div>
                                    <Label htmlFor="startDate">Date de début</Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Description FR */}
                            <div>
                                <Label htmlFor="descriptionFr">Description du poste (FR) *</Label>
                                <Textarea
                                    id="descriptionFr"
                                    value={formData.descriptionFr}
                                    onChange={(e) =>
                                        setFormData({ ...formData, descriptionFr: e.target.value })
                                    }
                                    rows={4}
                                />
                            </div>

                            {/* Qualifications FR */}
                            <div>
                                <Label htmlFor="qualificationsFr">Qualifications requises (FR)</Label>
                                <Textarea
                                    id="qualificationsFr"
                                    value={formData.qualificationsFr}
                                    onChange={(e) =>
                                        setFormData({ ...formData, qualificationsFr: e.target.value })
                                    }
                                    rows={3}
                                />
                            </div>

                            {/* Why Join Us FR */}
                            <div>
                                <Label htmlFor="whyJoinUsFr">Pourquoi nous rejoindre (FR)</Label>
                                <Textarea
                                    id="whyJoinUsFr"
                                    value={formData.whyJoinUsFr}
                                    onChange={(e) =>
                                        setFormData({ ...formData, whyJoinUsFr: e.target.value })
                                    }
                                    rows={3}
                                />
                            </div>

                            {/* Active Status */}
                            <div className="flex items-center justify-between border p-3 rounded">
                                <Label htmlFor="isActive">Offre active (visible sur le site)</Label>
                                <Switch
                                    id="isActive"
                                    checked={formData.isActive}
                                    onCheckedChange={(checked) =>
                                        setFormData({ ...formData, isActive: checked })
                                    }
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setDialogOpen(false)}
                                >
                                    Annuler
                                </Button>
                                <Button type="submit">
                                    Sauvegarder
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Jobs List */}
            <div className="grid gap-4">
                {jobs.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center text-gray-500">
                            Aucune offre d'emploi trouvée
                        </CardContent>
                    </Card>
                ) : (
                    jobs.map((job) => (
                        <Card key={job.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {job.titleFr}
                                            </h3>
                                            <Badge className={job.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                                                {job.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600 mb-2 line-clamp-2">
                                            {job.descriptionFr}
                                        </p>
                                        <div className="flex items-center text-sm text-gray-500 gap-4">
                                            {job.startDate && (
                                                <span>Début: {job.startDate}</span>
                                            )}
                                            <span>Créé le: {new Date(job.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleEdit(job)}
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDelete(job.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
