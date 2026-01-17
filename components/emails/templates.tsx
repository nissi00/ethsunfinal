import * as React from 'react';

interface AdminNotificationProps {
    type: string;
    data: any;
}

export const AdminNotificationEmail: React.FC<AdminNotificationProps> = ({
    type,
    data,
}) => (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
        <h2 style={{ color: '#0A2A43' }}>Nouvelle soumission : {type}</h2>
        <p>Vous avez reçu une nouvelle demande sur le site Ethsun.</p>

        <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
            <h3 style={{ marginTop: 0 }}>Détails</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {Object.entries(data).map(([key, value]) => {
                    if (key === 'status' || key === 'id' || key === 'createdAt' || value === null || value === undefined) return null;
                    return (
                        <li key={key} style={{ marginBottom: '10px' }}>
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
                        </li>
                    )
                })}
            </ul>
        </div>

        <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
            Cet email a été envoyé automatiquement depuis le site Ethsun.
        </p>
    </div>
);

interface VisitorConfirmationProps {
    firstName: string;
    type: string;
}

export const VisitorConfirmationEmail: React.FC<VisitorConfirmationProps> = ({
    firstName,
    type,
}) => (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ color: '#0A2A43', marginBottom: '10px' }}>ETHSUN</h1>
            <div style={{ width: '50px', height: '4px', backgroundColor: '#C9A44A', margin: '0 auto' }}></div>
        </div>

        <p>Bonjour <strong>{firstName}</strong>,</p>

        <p>Nous avons bien reçu votre demande de <strong>{type}</strong>.</p>

        <p>Notre équipe va examiner votre dossier et vous recontactera dans les plus brefs délais.</p>

        <p>Merci de votre intérêt pour Ethsun.</p>

        <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px', fontSize: '12px', color: '#666' }}>
            <p>Cordialement,<br />L'équipe Ethsun</p>
            <p><a href="https://ethsun-oxford.uk" style={{ color: '#C9A44A' }}>www.ethsun-oxford.uk</a></p>
        </div>
    </div>
);
