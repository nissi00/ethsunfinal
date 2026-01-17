"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2, Loader } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
  sortOrder: number;
  isActive: boolean;
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logoUrl: "",
    website: "",
    sortOrder: 0,
  });

  // Charger les partenaires
  const fetchPartners = async () => {
    try {
      const res = await fetch("/api/site/partners");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPartners(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des partenaires");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.logoUrl) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const method = editingId ? "PATCH" : "POST";
      const url = editingId
        ? `/api/site/partners/${editingId}`
        : "/api/site/partners";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success(
        editingId
          ? "Partenaire mis à jour"
          : "Partenaire créé avec succès"
      );

      setFormData({ name: "", logoUrl: "", website: "", sortOrder: 0 });
      setEditingId(null);
      fetchPartners();
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde");
      console.error(error);
    }
  };

  // Éditer un partenaire
  const handleEdit = (partner: Partner) => {
    setFormData({
      name: partner.name,
      logoUrl: partner.logoUrl,
      website: partner.website || "",
      sortOrder: partner.sortOrder,
    });
    setEditingId(partner.id);
  };

  // Télécharger un fichier logo
  const handleLogoUpload = async (file: File) => {
    if (!file) return;

    setUploadingLogo(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target?.result as string;
        const res = await fetch("/api/admin/partners/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: base64String }),
        });

        if (res.ok) {
          const data = await res.json();
          setFormData({ ...formData, logoUrl: data.logoUrl });
          toast.success("Logo téléchargé avec succès");
        } else {
          toast.error("Erreur lors du téléchargement");
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Erreur lors du traitement du fichier");
      console.error(error);
    } finally {
      setUploadingLogo(false);
    }
  };

  // Supprimer un partenaire
  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr ?")) return;

    try {
      const res = await fetch(`/api/site/partners/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Partenaire supprimé");
      fetchPartners();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Partenaires</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setFormData({ name: "", logoUrl: "", website: "", sortOrder: 0 });
              setEditingId(null);
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un partenaire
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Modifier le partenaire" : "Ajouter un partenaire"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nom *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="logoFile">Logo *</Label>
                <Input
                  id="logoFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleLogoUpload(e.target.files[0]);
                    }
                  }}
                  disabled={uploadingLogo}
                />
              </div>
              {formData.logoUrl && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Aperçu du logo:</p>
                  <img
                    src={formData.logoUrl}
                    alt="Logo preview"
                    className="h-20 w-auto object-contain"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="logoUrl">URL du logo (optionnel)</Label>
                <Input
                  id="logoUrl"
                  type="url"
                  value={formData.logoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, logoUrl: e.target.value })
                  }
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div>
                <Label htmlFor="website">Site web</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>
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
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({ name: "", logoUrl: "", website: "", sortOrder: 0 });
                    setEditingId(null);
                  }}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={uploadingLogo || !formData.logoUrl}>
                  {uploadingLogo ? "Traitement..." : "Sauvegarder"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {partners.map((partner) => (
          <Card key={partner.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="h-16 w-auto object-contain"
              />
              <div>
                <h3 className="font-semibold">{partner.name}</h3>
                {partner.website && (
                  <p className="text-sm text-gray-500">{partner.website}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(partner)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(partner.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
