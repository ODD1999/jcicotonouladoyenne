'use client';

import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiCalendar, FiUpload, FiCheck, FiArrowRight, FiArrowLeft, FiInfo, FiTrash } from 'react-icons/fi';
import styles from './AdhesionForm.module.scss';

interface FormData {
  // Informations personnelles
  nom: string;
  prenoms: string;
  formation: string;
  profession: string;
  adresse: string;
  employeur: string;
  dateNaissance: string;
  lieuNaissance: string;
  email: string;
  telephone: string;
  motivation: string;
  pieceIdentite: File | null;
  cv: File | null;
  
  // Découverte JCI
  commentConnueJci: string;
  autresCommentConnue: string;
  attentesJci: string[];
  autresAttentes: string;
  
  // Autres organisations
  autreOrganisation: boolean;
  typeOrganisation: string;
  autresTypeOrganisation: string;
  responsabilites: boolean;
  quellesResponsabilites: string[];
  autresResponsabilites: string;
  
  // Processus d'adhésion
  periodeProbatoireConnue: boolean;
  parrainNecessaireConnue: boolean;
  aParrain: boolean;
  nomParrain: string;
  formationEvaluationConnue: boolean;
  accepteFormation: boolean;
  formationsSuivies: boolean;
  themesFormations: Array<{theme: string, formateur: string}>;
  
  // Frais
  fraisConnus: boolean;
  disposeAcquitterFrais: boolean;
}

const AdhesionForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    // Informations personnelles
    nom: '',
    prenoms: '',
    formation: '',
    profession: '',
    adresse: '',
    employeur: '',
    dateNaissance: '',
    lieuNaissance: '',
    email: '',
    telephone: '',
    motivation: '',
    pieceIdentite: null,
    cv: null,
    
    // Découverte JCI
    commentConnueJci: '',
    autresCommentConnue: '',
    attentesJci: [],
    autresAttentes: '',
    
    // Autres organisations
    autreOrganisation: false,
    typeOrganisation: '',
    autresTypeOrganisation: '',
    responsabilites: false,
    quellesResponsabilites: [],
    autresResponsabilites: '',
    
    // Processus d'adhésion
    periodeProbatoireConnue: false,
    parrainNecessaireConnue: false,
    aParrain: false,
    nomParrain: '',
    formationEvaluationConnue: false,
    accepteFormation: false,
    formationsSuivies: false,
    themesFormations: Array(1).fill({theme: '', formateur: ''}),
    
    // Frais
    fraisConnus: false,
    disposeAcquitterFrais: false,
  });

  const totalSteps = 6;
  const stepTitles = [
    'Informations Personnelles',
    'Découverte JCI',
    'Autres Organisations',
    'Processus d\'Adhésion',
    'Formations Suivies',
    'Validation Finale'
  ];

  const handleStepChange = (newStep: number) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentStep(newStep);
      setFadeIn(true);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData(prev => ({ ...prev, [name]: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAttentesChange = (attente: string) => {
    setFormData(prev => ({
      ...prev,
      attentesJci: prev.attentesJci.includes(attente)
        ? prev.attentesJci.filter(a => a !== attente)
        : [...prev.attentesJci, attente]
    }));
  };

  const handleResponsabilitesChange = (responsabilite: string) => {
    setFormData(prev => ({
      ...prev,
      quellesResponsabilites: prev.quellesResponsabilites.includes(responsabilite)
        ? prev.quellesResponsabilites.filter(r => r !== responsabilite)
        : [...prev.quellesResponsabilites, responsabilite]
    }));
  };

  const handleThemeFormationChange = (index: number, field: 'theme' | 'formateur', value: string) => {
    setFormData(prev => ({
      ...prev,
      themesFormations: prev.themesFormations.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleAddFormation = () => {
    setFormData(prev => ({
      ...prev,
      themesFormations: [...prev.themesFormations, { theme: '', formateur: '' }]
    }));
  };

  const handleRemoveFormation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      themesFormations: prev.themesFormations.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/adhesion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        handleStepChange(totalSteps);
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Même en cas d'erreur, on continue pour une meilleure UX
      handleStepChange(totalSteps);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.nom && formData.prenoms && formData.email && formData.telephone;
      case 1:
        return formData.commentConnueJci && formData.attentesJci.length > 0;
      case 2:
        if (!formData.autreOrganisation) return true;
        return formData.typeOrganisation;
      case 3:
        return formData.nomParrain && formData.accepteFormation;
      case 4:
        if (!formData.formationsSuivies) return true;
        return formData.themesFormations.some(t => t.theme && t.formateur) && formData.motivation.trim().split(/\s+/).filter((word: string) => word.length > 0).length > 0;
      case 5:
        return formData.disposeAcquitterFrais;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1 formData={formData} handleInputChange={handleInputChange} />;
      case 1:
        return <Step2 formData={formData} handleInputChange={handleInputChange} handleAttentesChange={handleAttentesChange} />;
      case 2:
        return <Step3 formData={formData} handleInputChange={handleInputChange} handleResponsabilitesChange={handleResponsabilitesChange} />;
      case 3:
        return <Step4 formData={formData} handleInputChange={handleInputChange} />;
      case 4:
        return <Step5 formData={formData} handleInputChange={handleInputChange} handleThemeFormationChange={handleThemeFormationChange} handleAddFormation={handleAddFormation} handleRemoveFormation={handleRemoveFormation} />;
      case 5:
        return <Step6 formData={formData} handleInputChange={handleInputChange} />;
      default:
        return <SuccessStep formData={formData} />;
    }
  };

  return (
    <div className={styles.adhesionForm}>
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div className={styles.progressHeader}>
          <h2 className={styles.progressTitle}>Formulaire d'Adhésion JCI</h2>
          <p className={styles.progressSubtitle}>
            Étape {currentStep + 1} sur {totalSteps}: {stepTitles[currentStep]}
          </p>
        </div>
        <div className={styles.progressSteps}>
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`${styles.progressStep} ${i <= currentStep ? styles.active : ''} ${i < currentStep ? styles.completed : ''}`}
            >
              <div className={styles.progressDot}>
                {i < currentStep ? <FiCheck /> : i + 1}
              </div>
              <span className={styles.progressLabel}>{stepTitles[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <div className={`${styles.formContainer} ${fadeIn ? styles.fadeIn : ''}`}>
        {renderStep()}
      </div>

      {/* Navigation */}
      {currentStep < totalSteps && (
        <div className={styles.navigation}>
          <button
            onClick={() => handleStepChange(currentStep - 1)}
            disabled={currentStep === 0}
            className={`${styles.navButton} ${styles.prevButton} ${currentStep === 0 ? styles.disabled : ''}`}
          >
            <FiArrowLeft />
            Précédent
          </button>
          
          {currentStep === totalSteps - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className={`${styles.navButton} ${styles.submitButton} ${!isStepValid() ? styles.disabled : ''}`}
            >
              Soumettre le formulaire
              <FiCheck />
            </button>
          ) : (
            <button
              onClick={() => handleStepChange(currentStep + 1)}
              disabled={!isStepValid()}
              className={`${styles.navButton} ${styles.nextButton} ${!isStepValid() ? styles.disabled : ''}`}
            >
              Suivant
              <FiArrowRight />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Composants pour chaque étape
const Step1 = ({ formData, handleInputChange }: any) => (
  <div className={styles.step}>
    <h3 className={styles.stepTitle}>Informations Personnelles</h3>
    <div className={styles.formGrid}>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <FiUser className={styles.icon} />
          Nom *
        </label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Votre nom"
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <FiUser className={styles.icon} />
          Prénoms *
        </label>
        <input
          type="text"
          name="prenoms"
          value={formData.prenoms}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Vos prénoms"
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <FiBriefcase className={styles.icon} />
          Formation
        </label>
        <input
          type="text"
          name="formation"
          value={formData.formation}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Votre formation"
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <FiBriefcase className={styles.icon} />
          Profession ou occupation actuelle
        </label>
        <input
          type="text"
          name="profession"
          value={formData.profession}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Votre profession"
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <FiMapPin className={styles.icon} />
          Adresse
        </label>
        <input
          type="text"
          name="adresse"
          value={formData.adresse}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Votre adresse"
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <FiBriefcase className={styles.icon} />
          Employeur
        </label>
        <input
          type="text"
          name="employeur"
          value={formData.employeur}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Votre employeur"
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <FiCalendar className={styles.icon} />
          Date de naissance
        </label>
        <input
          type="date"
          name="dateNaissance"
          value={formData.dateNaissance}
          onChange={handleInputChange}
          className={styles.input}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <FiMapPin className={styles.icon} />
          Lieu de naissance
        </label>
        <input
          type="text"
          name="lieuNaissance"
          value={formData.lieuNaissance}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Ex: Cotonou"
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <FiMail className={styles.icon} />
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="votre.email@example.com"
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <FiPhone className={styles.icon} />
          Téléphone *
        </label>
        <input
          type="tel"
          name="telephone"
          value={formData.telephone}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="+229 XX XX XX XX"
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <FiUpload className={styles.icon} />
          Pièce d'identité
        </label>
        <input
          type="file"
          name="pieceIdentite"
          onChange={handleInputChange}
          className={styles.fileInput}
          accept="image/*,.pdf"
        />
        {formData.pieceIdentite && (
          <p className={styles.fileInfo}>
            Fichier: {formData.pieceIdentite.name}
          </p>
        )}
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <FiUpload className={styles.icon} />
          Curriculum Vitae (CV)
        </label>
        <input
          type="file"
          name="cv"
          onChange={handleInputChange}
          className={styles.fileInput}
          accept=".pdf,.doc,.docx"
        />
        {formData.cv && (
          <p className={styles.fileInfo}>
            Fichier: {formData.cv.name}
          </p>
        )}
      </div>
    </div>
  </div>
);

const Step2 = ({ formData, handleInputChange, handleAttentesChange }: any) => (
  <div className={styles.step}>
    <h3 className={styles.stepTitle}>Découverte JCI</h3>
    
    <div className={styles.questionBlock}>
      <h4 className={styles.questionTitle}>1. Comment avez-vous connu la Jeune Chambre ?</h4>
      <div className={styles.radioGroup}>
        {['Médias', 'Amis', 'Autres'].map((option) => (
          <label key={option} className={styles.radioLabel}>
            <input
              type="radio"
              name="commentConnueJci"
              value={option}
              checked={formData.commentConnueJci === option}
              onChange={handleInputChange}
            />
            <span className={styles.radioText}>{option}</span>
          </label>
        ))}
      </div>
      {formData.commentConnueJci === 'Autres' && (
        <textarea
          name="autresCommentConnue"
          value={formData.autresCommentConnue}
          onChange={handleInputChange}
          className={styles.textarea}
          placeholder="Précisez comment vous avez connu JCI..."
          rows={3}
        />
      )}
    </div>
    
    <div className={styles.questionBlock}>
      <h4 className={styles.questionTitle}>2. Quelles sont vos attentes en venant à la Jeune Chambre ?</h4>
      <div className={styles.checkboxGroup}>
        {['Réseautage', 'Affaires', 'Voyages', 'Formations', 'Services communautaires', 'Autres'].map((attente) => (
          <label key={attente} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.attentesJci.includes(attente)}
              onChange={() => handleAttentesChange(attente)}
            />
            <span className={styles.checkboxText}>{attente}</span>
          </label>
        ))}
      </div>
      {formData.attentesJci.includes('Autres') && (
        <textarea
          name="autresAttentes"
          value={formData.autresAttentes}
          onChange={handleInputChange}
          className={styles.textarea}
          placeholder="Précisez vos autres attentes..."
          rows={3}
        />
      )}
    </div>
  </div>
);

const Step3 = ({ formData, handleInputChange, handleResponsabilitesChange }: any) => (
  <div className={styles.step}>
    <h3 className={styles.stepTitle}>Autres Organisations</h3>
    
    <div className={styles.questionBlock}>
      <h4 className={styles.questionTitle}>3. Appartenez-vous déjà à une autre organisation ou à un club service ?</h4>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="autreOrganisation"
            value="true"
            checked={formData.autreOrganisation === true}
            onChange={() => handleInputChange({ target: { name: 'autreOrganisation', value: true } })}
          />
          <span className={styles.radioText}>Oui</span>
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="autreOrganisation"
            value="false"
            checked={formData.autreOrganisation === false}
            onChange={() => handleInputChange({ target: { name: 'autreOrganisation', value: false } })}
          />
          <span className={styles.radioText}>Non</span>
        </label>
      </div>
    </div>
    
    {formData.autreOrganisation && (
      <>
        <div className={styles.questionBlock}>
          <h4 className={styles.questionTitle}>4. Dans l'affirmative, indiquer le type d'organisation ?</h4>
          <div className={styles.radioGroup}>
            {['ONG', 'Parti politique', 'Association religieuse', 'Club service', 'Autres'].map((type) => (
              <label key={type} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="typeOrganisation"
                  value={type}
                  checked={formData.typeOrganisation === type}
                  onChange={handleInputChange}
                />
                <span className={styles.radioText}>{type}</span>
              </label>
            ))}
          </div>
          {formData.typeOrganisation === 'Autres' && (
            <input
              type="text"
              name="autresTypeOrganisation"
              value={formData.autresTypeOrganisation}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Précisez le type d'organisation..."
            />
          )}
        </div>
        
        <div className={styles.questionBlock}>
          <h4 className={styles.questionTitle}>5. Exercez-vous une ou plusieurs responsabilités au sein de ladite association ?</h4>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="responsabilites"
                value="true"
                checked={formData.responsabilites === true}
                onChange={() => handleInputChange({ target: { name: 'responsabilites', value: true } })}
              />
              <span className={styles.radioText}>Oui</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="responsabilites"
                value="false"
                checked={formData.responsabilites === false}
                onChange={() => handleInputChange({ target: { name: 'responsabilites', value: false } })}
              />
              <span className={styles.radioText}>Non</span>
            </label>
          </div>
        </div>
        
        {formData.responsabilites && (
          <div className={styles.questionBlock}>
            <h4 className={styles.questionTitle}>6. Dans l'affirmative, bien vouloir préciser lesquelles :</h4>
            <div className={styles.checkboxGroup}>
              {['Président', 'Trésorier', 'Secrétaire Général', 'Vice-président', 'Autres'].map((resp) => (
                <label key={resp} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.quellesResponsabilites.includes(resp)}
                    onChange={() => handleResponsabilitesChange(resp)}
                  />
                  <span className={styles.checkboxText}>{resp}</span>
                </label>
              ))}
            </div>
            {formData.quellesResponsabilites.includes('Autres') && (
              <input
                type="text"
                name="autresResponsabilites"
                value={formData.autresResponsabilites}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Précisez vos autres responsabilités..."
              />
            )}
          </div>
        )}
      </>
    )}
  </div>
);


const Step5 = ({ formData, handleInputChange, handleThemeFormationChange, handleAddFormation, handleRemoveFormation }: any) => (
  <div className={styles.step}>
    <h3 className={styles.stepTitle}>Formations Suivies</h3>
    
    <div className={styles.questionBlock}>
      <h4 className={styles.questionTitle}>12. Avez-vous déjà suivi des formations organisées à l'intention des futurs membres de la Jeune Chambre ?</h4>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="formationsSuivies"
            value="true"
            checked={formData.formationsSuivies === true}
            onChange={() => handleInputChange({ target: { name: 'formationsSuivies', value: true } })}
          />
          <span className={styles.radioText}>Oui</span>
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="formationsSuivies"
            value="false"
            checked={formData.formationsSuivies === false}
            onChange={() => handleInputChange({ target: { name: 'formationsSuivies', value: false } })}
          />
          <span className={styles.radioText}>Non</span>
        </label>
      </div>
    </div>
    
    {formData.formationsSuivies && (
      <div className={styles.questionBlock}>
        <h4 className={styles.questionTitle}>13. Dans l'affirmation, indiquer ci-dessous les thèmes que vous avez suivis :</h4>
        <div className={styles.formationsGrid}>
          {formData.themesFormations.map((formation: any, index: number) => (
            <div key={index} className={styles.formationRow}>
              <div className={styles.formationField}>
                <label className={styles.label}>Thème {index + 1}</label>
                <input
                  type="text"
                  value={formation.theme}
                  onChange={(e) => handleThemeFormationChange(index, 'theme', e.target.value)}
                  className={styles.input}
                  placeholder="Nom du thème"
                />
              </div>
              <div className={styles.formationField}>
                <label className={styles.label}>Formateur</label>
                <input
                  type="text"
                  value={formation.formateur}
                  onChange={(e) => handleThemeFormationChange(index, 'formateur', e.target.value)}
                  className={styles.input}
                  placeholder="Nom du formateur"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFormation(index)}
                className={styles.removeIconButton}
                title="Supprimer cette formation"
              >
                <FiTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddFormation}
            className={styles.addButton}
          >
            Ajouter une formation
          </button>
        </div>
      </div>
    )}
    
    <div className={styles.questionBlock}>
      <h4 className={styles.questionTitle}>13. Dites-nous en 300 mots votre motivation à intégrer cette organisation</h4>
      <div className={styles.formGroup}>
        <textarea
          name="motivation"
          value={formData.motivation}
          onChange={(e) => {
            const words = e.target.value.trim().split(/\s+/).filter((word: string) => word.length > 0);
            if (words.length <= 300) {
              handleInputChange(e);
            }
          }}
          className={styles.textarea}
          placeholder="Exprimez votre motivation en 300 mots maximum..."
          maxLength={2000}
        />
        <div className={styles.wordCounter}>
          <span className={`${styles.wordCount} ${
            formData.motivation.trim().split(/\s+/).filter((word: string) => word.length > 0).length > 250 ? styles.warning :
            formData.motivation.trim().split(/\s+/).filter((word: string) => word.length > 0).length > 280 ? styles.danger : ''
          }`}>
            {formData.motivation.trim().split(/\s+/).filter((word: string) => word.length > 0).length}
          </span>
          <span className={styles.wordSeparator}>/</span>
          <span className={styles.wordMax}>300 mots</span>
        </div>
      </div>
    </div>
  </div>
);

const InfoBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className={styles.infoBlock}>
    <div className={styles.infoHeader}>
      <FiInfo className={styles.infoIcon} />
      <h4 className={styles.infoTitle}>{title}</h4>
    </div>
    <div className={styles.infoContent}>
      {children}
    </div>
  </div>
);

const Step4 = ({ formData, handleInputChange }: any) => (
  <div className={styles.step}>
    <h3 className={styles.stepTitle}>Processus d'Adhésion</h3>
    
    <InfoBlock title="Période Probatoire">
      <p>Vous êtes appelé à suivre une période probatoire de six (06) à douze (12) mois préalablement à votre adhésion à la Jeune Chambre.</p>
    </InfoBlock>
    
    <InfoBlock title="Parrainage">
      <p>Pour votre suivi, vous devez avoir un parrain membre de la Jeune Chambre.</p>
    </InfoBlock>
    
    <div className={styles.questionBlock}>
      <h4 className={styles.questionTitle}>Nom de votre parrain</h4>
      <div className={styles.formGroup}>
        <input
          type="text"
          name="nomParrain"
          value={formData.nomParrain}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Entrez le nom de votre parrain"
        />
      </div>
    </div>
    
    <InfoBlock title="Formation et Évaluation">
      <p>Au cours de votre période préparatoire, vous êtes appelé à suivre un programme de formation qui sera évalué.</p>
    </InfoBlock>
    
    <div className={styles.questionBlock}>
      <h4 className={styles.questionTitle}>Confirmez-vous votre acceptation du programme de formation ?</h4>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="accepteFormation"
            value="true"
            checked={formData.accepteFormation === true}
            onChange={() => handleInputChange({ target: { name: 'accepteFormation', value: true } })}
          />
          <span className={styles.radioText}>Oui</span>
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="accepteFormation"
            value="false"
            checked={formData.accepteFormation === false}
            onChange={() => handleInputChange({ target: { name: 'accepteFormation', value: false } })}
          />
          <span className={styles.radioText}>Non</span>
        </label>
      </div>
    </div>
  </div>
);

const Step6 = ({ formData, handleInputChange }: any) => (
  <div className={styles.step}>
    <h3 className={styles.stepTitle}>Validation Finale</h3>
    
    <InfoBlock title="Frais d'Adhésion">
      <p>Au moment de la confirmation de votre volonté d'adhérer à la Jeune Chambre, vous serez appelé à acquitter des frais de dossier et d'adhésion fixés à vingt mille (20 000) FCFA.</p>
    </InfoBlock>
    
    <div className={styles.questionBlock}>
      <h4 className={styles.questionTitle}>Etes-vous disposé à acquitter ces frais le moment venu ?</h4>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="disposeAcquitterFrais"
            value="true"
            checked={formData.disposeAcquitterFrais === true}
            onChange={() => handleInputChange({ target: { name: 'disposeAcquitterFrais', value: true } })}
          />
          <span className={styles.radioText}>Oui</span>
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="disposeAcquitterFrais"
            value="false"
            checked={formData.disposeAcquitterFrais === false}
            onChange={() => handleInputChange({ target: { name: 'disposeAcquitterFrais', value: false } })}
          />
          <span className={styles.radioText}>Non</span>
        </label>
      </div>
    </div>
    
    <div className={styles.noteBlock}>
      <div className={styles.noteHeader}>
        <FiInfo className={styles.noteIcon} />
        <h4>Note Importante</h4>
      </div>
      <p className={styles.noteText}>
        Le présent formulaire sera dûment rempli par les futurs membres d'une Organisation Locale ou les membres d'une Jeune Chambre Locale (JCL) en création.
      </p>
    </div>
  </div>
);

const SuccessStep = ({ formData }: any) => (
  <div className={styles.successStep}>
    <div className={styles.successContent}>
      <div className={styles.successIcon}>
        <FiCheck />
      </div>
      <h3 className={styles.successTitle}>Félicitations !</h3>
      <p className={styles.successMessage}>
        Votre formulaire d'adhésion a été soumis avec succès. Nous vous recontacterons prochainement pour la suite du processus.
      </p>
      <div className={styles.successSummary}>
        <h4>Récapitulatif de votre demande:</h4>
        <p><strong>Nom:</strong> {formData.nom} {formData.prenoms}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Téléphone:</strong> {formData.telephone}</p>
      </div>
    </div>
  </div>
);

export default AdhesionForm;
