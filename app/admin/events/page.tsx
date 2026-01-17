"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon, Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface Event {
  id: string;
  titleFr: string;
  titleEn?: string;
  titleEs?: string;
  descriptionFr: string;
  descriptionEn?: string;
  descriptionEs?: string;
  type: string;
  date: string;
  location: string;
  capacity?: number;
  registrationUrl?: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    titleFr: "",
    titleEn: "",
    titleEs: "",
    descriptionFr: "",
    descriptionEn: "",
    descriptionEs: "",
    type: "",
    date: "",
    location: "",
    capacity: "",
    registrationUrl: "",
    imageUrl: "",
    isActive: true,
    sortOrder: 0,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  // Charger les événements
  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/admin/events");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des événements");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titleFr || !formData.type || !formData.date || !formData.location) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const method = editingId ? "PATCH" : "POST";
      const url = editingId
        ? `/api/admin/events/${editingId}`
        : "/api/admin/events";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          capacity: formData.capacity ? parseInt(formData.capacity) : null,
          sortOrder: parseInt(formData.sortOrder.toString()),
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success(
        editingId ? "Événement mis à jour" : "Événement créé avec succès"
      );

      setFormData({
        titleFr: "",
        titleEn: "",
        titleEs: "",
        descriptionFr: "",
        descriptionEn: "",
        descriptionEs: "",
        type: "",
        date: "",
        location: "",
        capacity: "",
        registrationUrl: "",
        imageUrl: "",
        isActive: true,
        sortOrder: 0,
      });
      setEditingId(null);
      setDialogOpen(false);
      fetchEvents();
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde");
      console.error(error);
    }
  };

  // Éditer un événement
  const handleEdit = (event: Event) => {
    setFormData({
      titleFr: event.titleFr,
      titleEn: event.titleEn || "",
      titleEs: event.titleEs || "",
      descriptionFr: event.descriptionFr,
      descriptionEn: event.descriptionEn || "",
      descriptionEs: event.descriptionEs || "",
      type: event.type,
      date: event.date,
      location: event.location,
      capacity: event.capacity?.toString() || "",
      registrationUrl: event.registrationUrl || "",
      imageUrl: event.imageUrl || "",
      isActive: event.isActive,
      sortOrder: event.sortOrder,
    });
    setEditingId(event.id);
    setDialogOpen(true);
  };

  // Supprimer un événement
  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr ?")) return;

    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Événement supprimé");
      fetchEvents();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
      console.error(error);
    }
  };

  // Télécharger une image
  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target?.result as string;
        const res = await fetch("/api/admin/events/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: base64String }),
        });

        if (res.ok) {
          const data = await res.json();
          setFormData({ ...formData, imageUrl: data.imageUrl });
          toast.success("Image téléchargée avec succès");
        } else {
          toast.error("Erreur lors du téléchargement");
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Erreur lors du traitement du fichier");
      console.error(error);
    } finally {
      setUploadingImage(false);
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
          <h1 className="text-3xl font-bold text-gray-900">Événements</h1>
          <p className="text-gray-500">Gérer les événements du site</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setFormData({
                  titleFr: "",
                  titleEn: "",
                  titleEs: "",
                  descriptionFr: "",
                  descriptionEn: "",
                  descriptionEs: "",
                  type: "",
                  date: "",
                  location: "",
                  capacity: "",
                  registrationUrl: "",
                  imageUrl: "",
                  isActive: true,
                  sortOrder: 0,
                });
                setEditingId(null);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un événement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Modifier l'événement" : "Ajouter un événement"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Titre FR */}
              <div>
                <Label htmlFor="titleFr">Titre (FR) *</Label>
                <Input
                  id="titleFr"
                  value={formData.titleFr}
                  onChange={(e) =>
                    setFormData({ ...formData, titleFr: e.target.value })
                  }
                />
              </div>

              {/* Titre EN */}
              <div>
                <Label htmlFor="titleEn">Titre (EN)</Label>
                <Input
                  id="titleEn"
                  value={formData.titleEn}
                  onChange={(e) =>
                    setFormData({ ...formData, titleEn: e.target.value })
                  }
                />
              </div>

              {/* Titre ES */}
              <div>
                <Label htmlFor="titleEs">Titre (ES)</Label>
                <Input
                  id="titleEs"
                  value={formData.titleEs}
                  onChange={(e) =>
                    setFormData({ ...formData, titleEs: e.target.value })
                  }
                />
              </div>

              {/* Description FR */}
              <div>
                <Label htmlFor="descriptionFr">Description (FR) *</Label>
                <Textarea
                  id="descriptionFr"
                  value={formData.descriptionFr}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionFr: e.target.value })
                  }
                  rows={3}
                />
              </div>

              {/* Description EN */}
              <div>
                <Label htmlFor="descriptionEn">Description (EN)</Label>
                <Textarea
                  id="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEn: e.target.value })
                  }
                  rows={3}
                />
              </div>

              {/* Description ES */}
              <div>
                <Label htmlFor="descriptionEs">Description (ES)</Label>
                <Textarea
                  id="descriptionEs"
                  value={formData.descriptionEs}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEs: e.target.value })
                  }
                  rows={3}
                />
              </div>

              {/* Type */}
              <div>
                <Label htmlFor="type">Type *</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  placeholder="ex: Immobilier, Tourisme, etc."
                />
              </div>

              {/* Date */}
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Localisation *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="ex: Paris, France"
                />
              </div>

              {/* Capacity */}
              <div>
                <Label htmlFor="capacity">Capacité</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                />
              </div>

              {/* Registration URL */}
              <div>
                <Label htmlFor="registrationUrl">URL d'inscription</Label>
                <Input
                  id="registrationUrl"
                  type="url"
                  value={formData.registrationUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, registrationUrl: e.target.value })
                  }
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label htmlFor="imageFile">Image d'événement</Label>
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleImageUpload(e.target.files[0]);
                    }
                  }}
                  disabled={uploadingImage}
                />
              </div>

              {formData.imageUrl && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Aperçu:</p>
                  <img
                    src={formData.imageUrl}
                    alt="Event preview"
                    className="h-40 w-full object-cover rounded"
                  />
                </div>
              )}

              {/* Sort Order */}
              <div>
                <Label htmlFor="sortOrder">Ordre d'affichage</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) =>
                    setFormData({ ...formData, sortOrder: parseInt(e.target.value) })
                  }
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Actif</Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={uploadingImage}>
                  {uploadingImage ? "Traitement..." : "Sauvegarder"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Events List */}
      <div className="grid gap-4">
        {events.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              Aucun événement trouvé
            </CardContent>
          </Card>
        ) : (
          events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {event.titleFr}
                      </h3>
                      <Badge variant="outline">{event.type}</Badge>
                      <Badge className={event.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                        {event.isActive ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-3 bg-gray-50 p-2 rounded border">
                      <span className="font-semibold text-xs text-gray-500 uppercase block mb-1">Description</span>
                      {event.descriptionFr}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {event.location}
                      </span>
                      {event.capacity && (
                        <span className="flex items-center gap-1">
                          👥 {event.capacity} places
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(event)}
                    >
                      <Edit2 className="w-4 h-4 mr-2" /> Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Supprimer
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
