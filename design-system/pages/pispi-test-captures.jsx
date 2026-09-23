// PiSPI regulatory screen set, ordered from the CSV criteria.
const PISPI_CAPTURE_TESTS = [[1, "Positionnement du bouton", "Ce bouton doit être visible immédiatement, sans action supplémentaire de la part de l’utilisateur (scroll, sélection dans un menu, etc.)"], [2, "Image / Icone du bouton", "Utilisation d'une variante du logo de PI-SPI valide"], [3, "Titre / Texte du bouton", "Doit être PI ou PI-SPI, de préférence PI"], [4, "Action du bouton", "Si l'utilisateur à un alias, il doit être redirigé directement sur la page d'accueil sans ecran intermédiare; sinon le formulaire de création d'alias doit être affiché"], [5, "Choix du compte", "Le choix du compte ne doit pas se faire sur l'écran de création d'alias."], [6, "Titre du formulaire", "Titre de la page doit être la même que dans les exigences minimales"], [7, "Sous titre du formulaire", "Sous titre de la page doit être la même que dans les exigences minimales"], [8, "Options", "Les deux options doivent être affichés l'une à la suite de l'autre: l'option \"Choisir l'adresse de paiement\" doit être affiché avant l'option \"Choisir le numéro de téléphone\". Il ne faut pas utiliser de liste déroulante ou similaire l'utilisateur doit voir les deux options sans faire d'action supplémentaire"], [9, "Options", "Titre de l'option \"Choisir l'adresse de paiement\" doit être identique à celui des exigences minimales"], [10, "Options", "Sous titre de l'option \"Choisir l'adresse de paiement\" doit être identique à celui des exigences minimales"], [11, "Options", "Titre de l'option \"Choisir le numéro de téléphone\" doit être identique à celui des exigences minimales"], [12, "Options", "Sous titre de l'option \"Choisir le numéro de téléphone\" doit être identique à celui des exigences minimales"], [13, "Options - Adresse de paiement", "Lorsque le client clique sur cette option, la demande de création d'alias doit être envoyée automatiquement sans aucune validation de l'utilisateur (ni OTP, ni SMS, ni Biometrie, Ni Boite de dialogue) et la page de succès doit être affichée"], [14, "Options -  Numéro de téléphone", "Lorsque le client clique sur cette option, le formulaire de choix du numéro de téléphone s'affiche"], [15, "Titre du formulaire", "Titre de la page doit être la même que dans les exigences minimales"], [16, "Sous titre du formulaire", "Sous titre de la page doit être la même que dans les exigences minimales"], [17, "Champ Indicatif Pays", "L'utilisateur peut sélectionner un indicatif de tout pays de l'UEMOA"], [18, "Champ Indicatif Pays", "L'indicatif du pays du client doit par défaut être sélectionné mais il peut le modifier"], [19, "Champ Numéro de téléphone", "Ne doit permettre de choisir que des numéros ( format du clavier)"], [20, "Champ Numéro de téléphone", "Si le participant dispose du numéro de téléphone de l'utilisateur, il peut le prérenseigner mais l'utilisateur est libre de mettre tout numéro de téléphone"], [21, "Bouton Continuer", "Titre doit être la même que dans les exigences minimales"], [22, "Bouton Continuer", "Lorsque l'utilisateur clique sur le bouton, un code OTP sur 6 positions doit être envoyé au numéro de téléphone et le formulaire de saisi du code OTP doit être affiché"], [23, "Titre du formulaire", "Titre de la page doit être la même que dans les exigences minimales"], [24, "Sous titre du formulaire", "Sous titre de la page doit être la même que dans les exigences minimales"], [25, "Indicateur du temps restant avant de pouvoir redemander l'envoi d'un nouveau code OTP", "Un indicateur doit être affiché à l'utilisateur pour lui permettre après le temps ecoulé de pouvoir demander l'envoi d'un nouveau code OTP"], [26, "Indicateur du temps restant avant de pouvoir redemander l'envoi d'un nouveau code OTP", "Aprés l'expiration du délai d'attente, le bouton Renvoyer doit être affiché en dessous des champs de saisi - ce bouton remplace l'indicateur précédent"], [27, "Champ de saisie du code", "Ne doit accepter que des valeurs numériques"], [28, "Champ de saisie du code", "Validation automatique aprés saisie des 6 chiffres - Si le code OTP est valide, la page de succès de création d'alias est affichée si l'alias a pu être créé, sinon la page d'erreur"], [29, "Champ de saisie du code", "Message d'erreur si le code est incorrect ou a expiré affiché en dessous des champs de saisie"], [30, "Titre", "Doit être conforme aux exigences minimales"], [31, "Sous titre", "Doit être conforme aux exigences minimales"], [32, "Action \"Continuer\"", "Quand l'utilisateur clique sur le bouton, la page d'accueil de l'espace PI s'affiche"], [33, "Action \"Partager l'alias\"", "Ceci est optionnel - Cela doit ouvrir les options de partage du téléphone - uniquement la valeur textuelle de l'adresse de paiement doit être partagé sans aucun texte superflu"], [34, "Erreur: Numéro de téléphone non disponible", "Lorsque le numéro de téléphone est déjà pris (est déjà enregistré dans PI pour un autre compte), le message d'erreur correspondant doit être affiché avec les options \"Revendiquer l'alias\" et \"Choisir un autre alias\""], [35, "Erreur: Numéro de téléphone en cours de revendication", "Lorsque le numéro de téléphone est en cours de revendication dans PI-RAC, le message d'erreur correspondant doit être affiché"], [36, "Erreur: Compte a déjà un alias", "lorsque PI-RAC indique qu'un alias existe déjà sur ce compte, le PSP dans son backend doit enregistrer cet alias et retourner le message de succès au client - En d'autres termes, cela doit être transparent pour le client car il s'agit ici d'un probleme du système du participant"], [37, "Revendiquer l'alias", "Lorsque le client clique sur cette option, le participant doit envoyer une revendication sur l'alias à PI-RAC"], [38, "Revendiquer l'alias", "Lorsque la requête de revendication est acceptée par PI, un message de succès de \"Revendication envoyée avec succès\" doit être afiché"], [39, "Revendiquer l'alias", "Lorsque la requête de revendication est rejetée par PI par ce que l'alias est supprimé entre temps, le PSP doit renvoyer la demande de création d'alias et afficher le message de succès de création d'alias au client - Cela doit être transparent"], [40, "Choisir un autre alias", "Lorsque le client clique sur cette option, le formulaire de choix de l'alias doit être affiché pour lui permettre de selectionner une adresse de paiement ou un autre numéro de téléphone"], [41, "Logo PI-SPI", "Utilisation d'une variante du logo de PI-SPI valide (logo complet PI-SPI)"], [42, "Bouton d'accès aux notifications", "Pour permettre d'accéder aux notifications de l'application"], [43, "Bouton d'accès au profil / paramètres", "Pour permettre d'accèder aux paramètres de l'espace PI-SPI"], [44, "Présence des onglets Compte, Abonnements et Economies", "Titre des onglets doit être conforme aux exigences minimales"], [45, "Onglet Compte", "Onglet affiché par défaut"], [46, "Solde", "Doit être présent"], [47, "Solde", "Peut être affiché ou caché"], [48, "Solde", "A chaque fois qu'on vient sur la page d'accueil le solde est actualisé même si l'utilisateur l'a caché"], [49, "Bouton QR Code", "Permet d'afficher la page de QR Code"], [50, "Bouton QR Code", "Utilisation de l'image du QR Code PI sur la page d'accueil"], [51, "Bouton Mon Alias", "Présence du bouton \"Mon alias\""], [52, "Bouton Mon Alias", "Présence du bouton \"Partager\""], [53, "Boutons Envoyer, Recevoir et Plus", "Les trois boutons doivent être sur la même ligne"], [54, "Bouton Envoyer", "Texte du bouton doit être \"Envoyer\""], [55, "Bouton Envoyer", "Icone du bouton doit être conforme aux exigences minimales"], [56, "Bouton Envoyer", "Le clic sur le bouton doit afficher le formulaire d'envoi contenant toutes les options d'envoi"], [57, "Bouton Recevoir", "Texte du bouton doit être \"Recevoir\""], [58, "Bouton Recevoir", "Icone du bouton doit être conforme aux exigences minimales"], [59, "Bouton Recevoir", "Le clic sur le bouton doit afficher le formulaire de demande de paiement contenant toutes les options d'envoi de la demande"], [60, "Bouton Plus", "Texte du bouton peut être tout ce que souhaite le participant"], [61, "Bouton Plus", "Icone du bouton peut être tout ce que souhaite le participant"], [62, "Section Transactions", "Affichage des 3 dernières transactions"], [63, "Section Transactions", "Affichage du bouton \"tout afficher\" qui redirige sur La Page de Liste des transactions contenant les options de recherche"], [64, "Section Transactions", "Pour une transaction de la liste, il faut afficher le nom du client: si c'est une transaction reçue, c'est le nom du payeur sinon c'est le nom du payé"], [65, "Section Transactions", "Pour une transaction de la liste, il faut afficher l'avatar du client: si l'image existe, afficher la photo, sinon deux lettres correspondant à la première lettre du prénom et la première lettre du nom"], [66, "Section Transactions", "Pour une transaction de la liste, il faut afficher le montant de la transaction: Si c'est une transaction reçue, le montant s'affiche sans préfixe, Sinon le signe - est affiché avant le montant"], [67, "Section Transactions", "Pour une transaction de la liste, il faut afficher la date de l'opération au format \"7 juin, 11:56\""], [68, "Choix du numéro de compte", "Si le client a plusieurs comptes, depuis la page d'accueil il peut choisir un compte et tous les données seront affichés en fonction du compte choisi"], [69, "Présentation", "La liste des notifications est affichée avec les differents catégories de notifications"], [70, "Présentation", "Catégorie Tous : Affiche toutes les notifications;"], [71, "Présentation", "Catégorie Non lues : Affiche les notifications pas encore consultées;"], [72, "Présentation", "Catégorie Demande de paiement : Affiche les demandes de paiement reçues et envoyées;"], [73, "Présentation", "Catégorie Transfert : Affiche les notifications des transactions échouées ou rejetées;"], [74, "Présentation", "Catégorie Annulation : Affiche les demandes d’annulations reçues et rejetées;"], [75, "Présentation", "Catégorie Revendication d'alias : Affiche les demandes de revendication d'alias;"], [76, "Présentation", "Catégorie Abonnement : Affiche les notifications liées aux abonnements;"], [77, "Présentation", "Catégorie Tirelire : Affiche les notifications liées aux tirelires;"], [78, "Présentation", "Catégorie Tontine : Affiche les notifications liées aux tontines;"], [79, "Présentation", "Les notifications non lues doivent être affichées par défaut"], [80, "Présentation", "Les notifications d'un même jour sont regroupées ensemble"], [81, "Types de notification", "Affiche les notifications sur les revendications"], [82, "Affichage d'une notification", "Icone alias \"@\""], [83, "Affichage d'une notification", "Titre d'une notification \"Revendication d'alias\""], [84, "Affichage d'une notification", "Sous titre d'une notification de revendication reçue \"Vous avez reçu une revendication sur votre alias +227 XXXXXXX\""], [85, "Entête de la page", "Titre \"Revendication d'alias\""], [86, "Entête de la page", "Sous titre \"Numéro de téléphone réclamé\""], [87, "Données de la revendication", "Affichage du numéro de téléphone réclamé"], [88, "Données de la revendication", "Affichage de la date de la demande"], [89, "Données de la revendication", "Affichage du statut de la demande"], [90, "Données de la revendication", "Lorsque la revendication est initiée, afficher le message d'avertissement en rouge sur l'impact de la revendication sur cet alias"], [91, "Actions sur la page", "Bouton \"Refuser\": pour rejeter la demande de revendication"], [92, "Actions sur la page", "Bouton \"Accepter\": pour accepter la demande de revendication"], [93, "Bouton \"Refuser\"", "Au clic sur le bouton, le PSP doit envoyer un code OTP sur le numéro de téléphone et afficher un formulaire de saisi du code OTP"], [94, "Bouton \"Accepter\"", "Au clic sur le bouton, un dialogue de confirmation doit être affiché"], [95, "Dialogue d'acceptation", "Titre du dialogue \"Etes-vous sûr de vouloir supprimer votre alias?\""], [96, "Dialogue d'acceptation", "Texte du dialogue"], [97, "Dialogue d'acceptation", "Bouton Annuler Ferme le dialogue"], [98, "Dialogue d'acceptation", "Bouton Confirmer: affiche la double authentification par biométrie ou code PIN"], [99, "Dialogue d'acceptation", "Bouton Confirmer: après la double authentification, la revendication est acceptée, un message est affiché et l'utilisateur est redirigé sur la liste des notifications."], [100, "Bouton \"Refuser\"", "Un indicateur doit être affiché à l'utilisateur pour lui permettre après le temps ecoulé de pouvoir demander l'envoi d'un nouveau code OTP"], [101, "Bouton \"Refuser\"", "Aprés l'expiration du délai d'attente, le bouton Renvoyer doit être affiché en dessous des champs de saisi - ce bouton remplace l'indicateur précédent"], [102, "Bouton \"Refuser\"", "Ne doit accepter que des valeurs numériques"], [103, "Bouton \"Refuser\"", "Message d'erreur affiché si le code est incorrect ou a expiré doit être affiché en dessous des champs de saisie"], [104, "Bouton \"Refuser\"", "Validation automatique aprés saisie des 6 chiffres - Si le code OTP est valide, la revendication est rejetée et un message indiquant le succès de l'opération est affiché à l'utilisateur"], [105, "Entête", "Le nom de l'utilisateur doit être affiché"], [106, "Entête", "L'alias du compte doit être affiché - utiliser ... pour tenir sur une ligne"], [107, "Entête", "Un bouton copier doit etre affiché à cote de l'alias pour permettre de copier l'alias"], [108, "Entête", "L'avatar de l'utilisateur doit être affiché"], [109, "Entête", "L'avatar de l'utilisateur doit être affiché - l'utilisateur doit pouvoir choisir une photo pour son avatar"], [110, "Entête", "Lorsque l'utilisateur choisit une photo pour son avatar, il doit être mise à jour dans la base des alias"], [111, "Entête", "L'avatar de l'utilisateur doit être affiché - l'utilisateur doit pouvoir modifier son avatar"], [112, "Options obligatoires", "Menu \"Compte\" obligatoire"], [113, "Options obligatoires", "Menu \"Contacts et Alias\" obligatoire"], [114, "Options obligatoires", "Menu \"Centre d'aide\" obligatoire"], [115, "Affichage des details du compte", "Le type de compte peut être affiché - le libelle mais pas le code technique;"], [116, "Affichage des details du compte", "Le numéro de compte doit être affiché - Le numéro qui peut être utilisé pour recevoir des fonds via l'option de transfert par numéro de compte"], [117, "Affichage des details du compte", "Le numéro de compte doit pouvoir être copié : présence du bouton copier"], [118, "Affichage des details du compte", "L'alias \"adresse de paiement\" du compte doit être affiché et doit pouvoir être copié"], [119, "Affichage des details du compte", "L'alias \"numéro de téléphone\" du compte doit être affiché s'il existe et doit pouvoir être copié"], [120, "Bouton Supprimer mon alias", "Le bouton supprimer mon alias doit être présent en bas de la page"], [121, "Bouton Supprimer mon alias", "Lorsque l'utilisateur clique sur le bouton, une boite de dialogue de confirmation s'ouvre avec le texte correspondant au type d'alias qui est sur le point d'être supprimé"], [122, "Bouton Supprimer mon alias", "la double authentifiation est requise pour la suppression de l'alias"], [123, "Bouton Supprimer mon alias", "Après suppresssion de l'alias SHID, l'utilisateur est redirigé sur le formulaire de création d'alias"], [124, "Bouton Supprimer mon alias", "Après suppresssion de l'alias MBNO, un message de succès de suppression de l'alias est affiché et l'utilisateur reste sur la page Profil - Menu Compte"], [125, "Barre de recherche", "Présence obligatoire"], [126, "Bouton \"Nouveau Contact\"", "Présence obligatoire: permet d'ajouter un nouveau contact avec son alias dans l'app"], [127, "Bouton \"Nouveau Contact\"", "Titre du bouton doit respecter celui donner dans les exigences minimales"], [128, "Bouton \"Nouveau Contact\"", "Sous titre du bouton doit respecter celui donner dans les exigences minimales"], [129, "Bouton \"Nouveau Contact\"", "Quand l'utilisateur clique sur le bouton, le formulaire de création d'un nouveau contact est affiché"], [130, "Formulaire de création d'un nouveau contact", "Champ \"Prénoms et Nom\" obligatoire"], [131, "Formulaire de création d'un nouveau contact", "Champ \"Alias\" obligatoire avec le bouton coller pour permettre de coller un alias"], [132, "Formulaire de création d'un nouveau contact", "Bouton \"Annuler\" qui permet de fermer ce formulaire et de retourner sur la liste des contacts"], [133, "Formulaire de création d'un nouveau contact", "Bouton \"Enregistrer\" qui permet d'enregistrer le nouveau contact"], [134, "Formulaire de création d'un nouveau contact", "Le nouveau contact doit être enregistré dans les contacts du téléphone en utilisant le tag @PI pour le champ personnalisé"], [135, "Liste des contacts", "Si l'utilisateur n'a pas encore autorisé l'accès aux contacts, la permission doit lui être demandée"], [136, "Liste des contacts", "Présence obligatoire: la liste des contacts doit être affichée si l'utilisateur a donné sa permission"], [137, "Liste des contacts", "Affichage de l'avatar, du nom et de l'alias du contact. Si le contact n'a pas encore d'alias, le numéro de téléphone est affiché en lieu et place de l'alias"], [138, "Liste des contacts", "Affichage de l'avatar, du nom et de l'alias du contact: Si le contact a un alias, l'icone PI est affiché en miniature à cote de l'avatar"], [139, "Liste des contacts", "Lorsque l'utilisateur selectionne un contact qui n'a pas d'alias, un formulaire s'ouvre avec un seul champ de saisi de l'alias."], [140, "Liste des contacts", "Lorsque l'utilisateur selectionne un contact qui a un alias, on lui affiche deux boutons: \"Modifier l'alias\" et \"Supprimer l'alias\""], [141, "Liste des contacts", "Lorsque l'utilisateur clique sur \"Modifier l'alias\", un formulaire s'ouvre avec le nom comme titre et un champ de saisie de l'alias prérenseigné avec l'alias à modifier. l'utilisateur peut faire ses modifications et cliquer sur enregistrer"], [142, "Liste des contacts", "Lorsque l'utilisateur clique sur \"Supprimer l'alias\", si le contact n'a qu'un alias enregistré, le contact est supprimé du téléphone"], [143, "Liste des contacts", "Lorsque l'utilisateur clique sur \"Supprimer l'alias\", si le contact a aussi un numéro de téléphone enregistré, c'est uniquement l'alias qui est supprimé du contact"], [144, "Page par défaut", "Quand l'utilisateur clique sur le bouton QR Code, la page \"Mon Code\" s'affiche. Cependant si sur l'ecran d'accueil, le PSP a choisi d'avoir le bouton \"Mon alias\" avec la possibilité de le partager, il peut afficher par défaut la page \"Scanner\""], [145, "Détails de l'alias", "Afficher le nom du client"], [146, "Détails de l'alias", "Afficher l'alias du client avec la possibilité de le copier"], [147, "QR Code", "Afficher le QR Code avec le logo PI au milieu"], [148, "QR Code", "Afficher un bouton permettant de partager le QR Code"], [149, "QR Code", "Lorsqu'on clique sur le bouton partager, l'utilisateur a le choix de partager son alias ou son qr code"], [150, "QR Code", "Lorsque l'utilisateur choisit de partager son QR Code, L'image partagé doit contenir son nom en plus du QR Code"], [151, "Actions sur la page", "Afficher en bas de la page les boutons \"Scanner\" et \"Mon Code\" - Voir dans exigences minimales (switch)"], [152, "Bouton \"Scanner\"", "Quand l'utilisateur clique sur \"Scanner\", on affiche la page \"Scanner\" avec la caméra activée"], [153, "Flux caméra", "Doit être automatiquemant ouvert sans bouton intermédiaire"], [154, "Flux caméra", "Bouton pour que la lampe torche s'allume"], [155, "Actions sur la page", "Afficher en bas de la page les boutons \"Scanner\" et \"Mon Code\" - Voir dans exigences minimales (switch)"], [156, "Flux caméra", "Si le client scanne un QR Code PI valide, il est redirigé sur le formulaire d'envoi par QR Code si le QR Code ne contient pas de montant"], [157, "Flux caméra", "Si le client scanne un QR Code PI valide, il est redirigé sur le formulaire de confirmation d'envoi si le QR Code contient un montant"], [158, "Flux caméra", "Si le client scanne un QR Code PI contenant le champ Reference Label, ce dernier est envoyé dans le champ txId de la transaction"], [159, "Flux caméra", "Si le QR Code scanné est invalide, le message d'erreur est affiché, mais on reste sur le flux caméra pour donner la possibilité de scanner un autre QR Valide"], [160, "Flux caméra", "Présence d'un bouton permettant de selectionner une image depuis la galerie (Importation d'image)"], [161, "Importation d'image", "Si le client selectionne un QR Code PI valide, il est redirigé sur le formulaire d'envoi par QR Code si le QR Code ne contient pas de montant"], [162, "Importation d'image", "Si le client selectionne un QR Code PI valide, il est redirigé sur le formulaire de confirmation d'envoi si le QR Code contient un montant"], [163, "Importation d'image", "Si le client selectionne un QR Code PI valide contenant le champ Reference Label, ce dernier est envoyé dans le champ txId de la transaction"], [164, "Importation d'image", "Si le QR Code selectionné est invalide, le message d'erreur est affiché"], [165, "Bouton \"Mon Code\"", "Permet d'afficher la page \"Mon Code\""], [166, "Rechercher un contact", "Afficher la barre de recherche d'un contact et permettre de rechercher en utilisant le nom ou le prenom"], [167, "Rechercher un contact", "Lorsque l'utilisateur commence à rechercher, les autres options d'envoi sont cachées"], [168, "Rechercher un contact", "Lorsque l'utilisateur finit de rechercher, les autres options d'envoi sont réaffichées"], [169, "Scanner un QR Code", "Un bouton permettant de scanner un QR Code pour faire un envoi doit être disponible sur la page à côte du champ de recherche d'un contact"], [170, "Scanner un QR Code", "C'est le parcours de la Page \"Scanner\" qui commence au clic de ce bouton"], [171, "Options", "Titre de la section \"Envoyer\""], [172, "Option: Par alias", "Le titre doit être \"Par Alias\""], [173, "Option: Par alias", "Le sous-titre doit être \"Adresse de paiement ou numéro de téléphone\""], [174, "Option: Par numéro de compte", "Le titre doit être \"Par numéro de compte\""], [175, "Option: Par numéro de compte", "Le sous-titre doit être \"RIB, IBAN, n° de téléphone ou autre\""], [176, "Option: Par IBAN", "Accepté que pour ceux qui ont l'ancienne version et qui ont déja implémenté ce bouton, Ne pas accepter cette option pour les nouveaux participants"], [177, "Option: Nouveau contact", "Le titre doit être \"Nouveau contact\""], [178, "Option: Nouveau contact", "Le sous-titre doit être \"Ajouter un contact avec son alias\""], [179, "Transactions recentes", "Titre de la section \"Transactions récentes\""], [180, "Transactions recentes", "Affichage des 2 dernières transactions récentes"], [181, "Transactions recentes", "Pour une transaction de la liste, il faut afficher le nom du client: si c'est une transaction reçue, c'est le nom du payeur sinon c'est le nom du payé"], [182, "Transactions recentes", "Pour une transaction de la liste, il faut afficher l'avatar du client: si l'image existe, afficher la photo, sinon deux lettres correspondant à la première lettre du prénom et la première lettre du nom"], [183, "Transactions recentes", "Pour une transaction de la liste, il faut afficher le montant de la transaction: il faut qu'on puisse savoir visuellement qu'il s'agit d'un envoi ou d'une reception"], [184, "Transactions recentes", "Pour une transaction de la liste, il faut afficher la date de l'opération"], [185, "Transactions recentes", "Lorsqu'on selectionne une transaction de la liste, le formulaire correspondant s'affiche avec l'alias et le montant prérempli (par alias) ou le numéro de compte et le montant prérempli (par numéro de compte)"], [186, "Liste des contacts", "Titre de la section \"Contacts\""], [187, "Liste des contacts", "Si l'utilisateur n'a pas encore autorisé l'accès aux contacts, la permission doit lui être demandée"], [188, "Liste des contacts", "Présence obligatoire: la liste des contacts doit être affichée si l'utilisateur a donné sa permission"], [189, "Liste des contacts", "Affichage de l'avatar, du nom et de l'alias du contact ou numéro de téléphone du contact."], [190, "Liste des contacts", "Si le contact n'a pas encore d'alias, le numéro de téléphone est affiché en lieu et place de l'alias"], [191, "Liste des contacts", "Si le contact a un alias, l'alias est affiché et l'icone PI est affiché en miniature à cote de l'avatar"], [192, "Selection d'un contact", "Si le contact n'a pas encore d'alias, le Formulaire d'envoi à un nouveau contact est affiché avec le nom du contact renseigné et l'utilisateur saisit ou colle juste l'alias"], [193, "Selection d'un contact", "Si le contact n'a pas encore d'alias, au clic sur le bouton \"Enregistrer et Continuer\" du Formulaire d'envoi à un nouveau contact, le contact est modifié avec l'ajout de l'alias (tag @PI)"], [194, "Selection d'un contact", "Si le contact a un alias, le Formulaire d'envoi à un contact est affiché"], [195, "Titre de la page", "Envoyer par Alias ou Envoi par alias"], [196, "Sous titre de la page", "Coller ou saisisser l'alias"], [197, "Ordre d'affichage des champs: Alias, Montant, Note", "L'ordre doit être respecté"], [198, "Champ Alias", "Editable: accepte des numéros de téléphone avec indicatif pays"], [199, "Champ Alias", "Editable: accepte une adresse de paiement"], [200, "Champ Alias", "Editable: permet de rechercher et de choisir un contact"], [201, "Champ Alias", "Bouton coller permettant de coller un alias"], [202, "Champ Alias", "Message d'erreur en dessous du champ si le format de l'alias est invalide ni un numéro de téléphone, ni un UUID v4"], [203, "Champ Montant", "Accepte que des chiffres"], [204, "Champ Montant", "n'accepte pas les nombres décimaux"], [205, "Champ Montant", "Solde affiché en dessous du champ"], [206, "Champ Montant", "Message d'erreur en dessous du champ si le solde est insuffisant"], [207, "Champ Note ou Motif", "Champ optionnel"], [208, "Champ Note ou Motif", "Maximum 140 caractères"], [209, "Bouton \"Continuer\"", "Le clic sur ce bouton affiche la page de confirmation de l'envoi"], [210, "Titre de la page", "Confirmation"], [211, "Sous titre de la page", "Voulez-vous vraiment effectuer un transfert au profit de ce bénéficiaire"], [212, "Champ Alias", "Affiche la valeur de l'alias du bénéficiare"], [213, "Champ Pays", "Affiche le pays du bénéficiare"], [214, "Champ Institution financière", "Affiche le nom du participant bénéficiare"], [215, "Champ Nom du bénéficiaire", "Affiche le com complet du bénéficiaire tel que retourné par la recherche d'alias"], [216, "Champ Montant", "Affiche le montant de la transaction"], [217, "Champ Frais", "Affiche gratuit si l'envoi est gratuit selon les règles de PI"], [218, "Champ Frais", "Affiche le montant des frais si l'envoi est facturé selon les règles de PI (transfert transfontalier par exemple)"], [219, "Champ Note ou Motif", "Affiche le motif renseigné par le client à l'étape précédente"], [220, "Bouton \"Annuler\"", "Permet d'annuler l'envoi et de revenir sur la Page \"Options d'envoi\""], [221, "Bouton \"Confirmer\"", "Au clic - on rècupère la position GPS de l'utilisateur - on demande la permission à l'utilisateur si pas encore accordée la première fois"], [222, "Bouton \"Confirmer\"", "On demande la double authentification à l'utilisateur par biométrie ou code PIN - aprés authentification, l'ordre de transfert peut être envoyé"], [223, "Bouton \"Confirmer\"", "Aprés envoi de l'ordre de transfert, un loader doit s'afficher, le temps de recevoir la notification de succès ou d'echec de l'envoi"], [224, "Bouton \"Confirmer\"", "Lorsque la transaction est irrévocable, afficher le dialogue de succès"], [225, "Bouton \"Confirmer\"", "Lorsque la transaction est rejetée, afficher le dialogue d'echec avec le bon message d'erreur correspondant au motif de rejet"], [226, "Bouton \"Confirmer\"", "Lorsque la transaction est toujours initiée après le timeout de 30s, afficher un dialogue avec le message d'erreur indiquant cela."], [227, "Bouton \"Programmer\"", "Permet à l'utilisateur de programmer l'envoi"], [228, "Titre de la page", "Envoyer par numéro de compte ou Envoi par numéro de compte"], [229, "Sous titre de la page", "RIB, IBAN, n° de téléphone ou autre identifiant"], [230, "Ordre d'affichage des champs: Numéro de compte, Pays, Institution financière, Montant, Note", "L'ordre doit être respecté"], [231, "Champ \"Numéro de compte\"", "Titre du champ \"Numéro de compte\""], [232, "Champ \"Numéro de compte\"", "minimum 1 caractère"], [233, "Champ \"Numéro de compte\"", "maximum 34 caractères"], [234, "Champ \"Numéro de compte\"", "Accepte des numéros de telephone sans indicatif"], [235, "Champ \"Numéro de compte\"", "Accepte des numéros de telephone avec indicatif"], [236, "Champ \"Numéro de compte\"", "Permet de rechercher un contact et de selectionner un contact"], [237, "Champ \"Numéro de compte\"", "Accepte un IBAN"], [238, "Champ \"Numéro de compte\"", "Accepte un RIB"], [239, "Champ \"Numéro de compte\"", "Accepte n'importe quel numéro de compte qu'une institution peut utiliser"], [240, "Champ \"Numéro de compte\"", "Un bouton coller qui permet de coller un numéro de compte sur le champ"], [241, "Champ Pays", "Titre du champ \"Pays du bénéficiaire\""], [242, "Champ Pays", "Si le numéro de compte est un IBAN, le pays est déduit de l'IBAN et le champ n'est pas modifiable par le client"], [243, "Champ Pays", "Si le numéro de compte n'est pas un IBAN, le pays peut être selectionné par l'utilisateur"], [244, "Champ Pays", "L'utilisateur ne peut selectionner que parmi les pays de l'UEMOA"], [245, "Champ Institution financière", "Titre du champ \"Institution financière\""], [246, "Champ Institution financière", "Si le numéro de compte est un IBAN, l'institution financière est déduit de l'IBAN et le champ n'est pas modifiable par le client"], [247, "Champ Institution financière", "Si le numéro de compte est un IBAN et que l'institution financière est désactivé, le message d'erreur correspondant doit être affiché"], [248, "Champ Institution financière", "Si le numéro de compte est un IBAN et que l'institution financière n'est pas dans la liste, le message d'erreur correspondant doit être affiché"], [249, "Champ Institution financière", "Si le numéro de compte n'est pas un IBAN, l'Institution financière peut être selectionnée par l'utilisateur"], [250, "Champ Institution financière", "Les institutions financières du pays selectionné sont affichés uniquement - pas toute la liste"], [251, "Champ Institution financière", "La liste des institutions financières ne doit afficher que les institutions dont le statut est activé ou désactivé"], [252, "Champ Institution financière", "Une institution financière qui est desactivée doit être affichée dans la liste mais grisée avec un message en dessous de son nom: \"indisponible\" ou \"en maintenance\""], [253, "Champ Institution financière", "Uniquement le nom de l'institution doit être affiché - le code membre ne doit pas l'être"], [254, "Champ Montant", "Accepte que des chiffres"], [255, "Champ Montant", "N'accepte pas les nombres décimaux"], [256, "Champ Montant", "Solde affiché en dessous du champ"], [257, "Champ Montant", "Message d'erreur en dessous du champ si le solde est insuffisant"], [258, "Champ Note ou Motif", "Champ optionnel"], [259, "Champ Note ou Motif", "Maximum 140 caractères"], [260, "Bouton \"Continuer\"", "Le clic sur ce bouton déclenche l'envoi de la vérification de compte et affiche la page de confirmation de l'envoi"], [261, "Titre de la page", "Confirmation"], [262, "Sous titre de la page", "Voulez-vous vraiment effectuer un transfert au profit de ce bénéficiaire"], [263, "Champ Numéro de compte", "Affiche le numéro de compte du bénéficiare"], [264, "Champ Pays", "Affiche le pays du bénéficiare"], [265, "Champ Institution financière", "Affiche le nom du participant bénéficiare"], [266, "Champ Nom du bénéficiaire", "Affiche le com complet du bénéficiaire tel que retourné par la vérification de l'existence du compte"], [267, "Champ Montant", "Affiche le montant de la transaction"], [268, "Champ Frais", "Affiche gratuit si l'envoi est gratuit selon les règles de PI"], [269, "Champ Frais", "Affiche le montant des frais si l'envoi est facturé selon les règles de PI (transfert transfontalier par exemple)"], [270, "Champ Note ou Motif", "Affiche le motif renseigné par le client"], [271, "Bouton \"Annuler\"", "Permet d'annuler l'envoi et de revenir sur la Page \"Options d'envoi\""], [272, "Bouton \"Confirmer\"", "Au clic - on rècupère la position GPS de l'utilisateur - on demande la permission à l'utilisateur si pas encore accordée la première fois"], [273, "Bouton \"Confirmer\"", "On demande la double authentification à l'utilisateur par biométrie ou code PIN - aprés authentification, l'ordre de transfert peut être envoyé"], [274, "Bouton \"Confirmer\"", "Aprés envoi de l'ordre de transfert, un loader doit s'afficher, le temps de recevoir la notification de succès ou d'echec de l'envoi"], [275, "Bouton \"Confirmer\"", "Lorsque la transaction est irrévocable, afficher le dialogue de succès"], [276, "Bouton \"Confirmer\"", "Lorsque la transaction est rejetée, afficher le dialogue d'echec avec le bon message d'erreur correspondant au motif de rejet"], [277, "Bouton \"Confirmer\"", "Lorsque la transaction est toujours initiée après le timeout de 30s, afficher un dialogue avec le message d'erreur indiquant cela."], [278, "Bouton \"Programmer\"", "Permet à l'utilisateur de programmer l'envoi"], [279, "Titre de la page", "Envoyer par IBAN ou Envoi par IBAN"], [280, "Sous titre de la page", "Coller ou saissiez le numéro de compte bancaire international"], [281, "Ordre d'affichage des champs: IBAN, Pays, Banque, Montant, Note", "L'ordre doit être respecté"], [282, "Champ IBAN", "Titre du champ \"Numéro IBAN\""], [283, "Champ IBAN", "Accepte que des IBAN - format IBAN vérifié"], [284, "Champ Pays", "Le pays est déduit de l'IBAN et le champ n'est pas modifiable par le client"], [285, "Champ Banque", "La banque est déduit de l'IBAN et le champ n'est pas modifiable par le client"], [286, "Champ Montant", "Accepte que des chiffres"], [287, "Champ Montant", "N'accepte pas les nombres décimaux"], [288, "Champ Montant", "Solde affiché en dessous du champ"], [289, "Champ Montant", "Message d'erreur en dessous du champ si le solde est insuffisant"], [290, "Champ Note ou Motif", "Champ optionnel"], [291, "Champ Note ou Motif", "Maximum 140 caractères"], [292, "Bouton \"Continuer\"", "Le clic sur ce bouton déclenche l'envoi de la vérification de compte et affiche la page de confirmation de l'envoi"], [293, "Champs", "Doit être identique à celle l'envoi par numéro de compte"], [294, "Titre de la page", "Ajouter un contact"], [295, "Sous titre de la page", "Enregistrer un nouveau contact avec son alias"], [296, "Ordre d'affichage des champs: Prénoms et nom, Alias", "L'ordre doit être respecté"], [297, "Champ \"Prénoms et nom\"", "Titre du champ \"Prénoms et nom\""], [298, "Champ \"Alias\"", "Accepte une adresse de paiement (format UUID v4)"], [299, "Champ \"Alias\"", "Accepte un numéro de téléphone avec l'indicatif"], [300, "Champ \"Alias\"", "Bouton coller permettant de coller un alias"], [301, "Champ \"Alias\"", "Message d'erreur en dessous si l'alias n'est pas valide"], [302, "Bouton \"Enregistrer et continuer\"", "Au clic, le PSP enregistre l'alias dans les contacts comme un nouveau contact et affiche le formulaire d'envoi à un contact en utilisant ce nouveau contact"], [303, "Nom du contact", "Affiche le nom du contact non éditable"], [304, "Alias de compte", "Affiche l'alias de compte non éditable"], [305, "Champ Montant", "Accepte que des chiffres"], [306, "Champ Montant", "N'accepte pas les nombres décimaux"], [307, "Champ Montant", "Solde affiché en dessous du champ"], [308, "Champ Montant", "Message d'erreur en dessous du champ si le solde est insuffisant"], [309, "Champ Note ou Motif", "Champ optionnel"], [310, "Champ Note ou Motif", "Maximum 140 caractères"], [311, "Bouton \"Continuer\"", "Le clic sur ce bouton affiche la page de confirmation de l'envoi"], [312, "Champ montant", "Le montant de la transaction récente est renseigné par défaut"], [313, "Champ montant", "Le montant de la transaction récente est modifiable"], [314, "Champ Note ou Motif", "Le motif de la transaction récente est renseigné par défaut"], [315, "Champ Note ou Motif", "Le motif est modifiable"], [316, "Champ Note ou Motif", "Le motif  optionnel"], [317, "Champ Note ou Motif", "Le motif renseigné peut être au maximum sur 104 caractères"], [318, "Entête", "Affichage du montant de transaction avec le signe \"-\""], [319, "Entête", "Affichage du nom du client payé"], [320, "Entête", "Affichage de la date de la transaction au format \"7 juin, 15:17\""], [321, "Entête", "Affichage de l'avatar du client payé : Si photo non disponible, Utiliser les initiales du nom"], [322, "Actions possibles", "Bouton \"Envoyer\", \"Annuler\", \"Partager\", \"Planifier\""], [323, "Bouton \"Envoyer\"", "Permet d'envoyer de nouveau au même client: ouvre le Formulaire d'envoi par alias si c'était un envoi par alias"], [324, "Bouton \"Envoyer\"", "Permet d'envoyer de nouveau au même client: ouvre le Formulaire d'envoi par numéro de compte si c'était un envoi par numéro de compte"], [325, "Bouton \"Envoyer\"", "Permet d'envoyer de nouveau au même client: ouvre le Formulaire d'envoi par iban si c'était un envoi par iban"], [326, "Bouton \"Annuler\"", "Permet d'envoyer une demande d'annulation: affiche le Dialogue de demande d'annulation"], [327, "Bouton \"Annuler\"", "Grisé une fois que la demande d'annulation est acceptée"], [328, "Bouton \"Partager\"", "Permet de partager cet envoi avec d'autres clients via la fonctionnalité de demande de paiement : ouvre le Parcours de partage de paiement"], [329, "Bouton \"Planifier\"", "Permet de créer un paiement programmé à partir des données de cette transaction: ouvre le Formulaire de choix de la fréquence et de la date d'envoi"], [330, "Détails sur les références", "Référence unique de la transaction dans PI-SPI (Codifié EndtoEndId dans PI)"], [331, "Détails sur les références", "Le nom du champ contenant le EndtoEndId doit être \"Référence\""], [332, "Détails sur les références", "Identifiant du marchand, le client payé, (Codifié TxId dans PI)"], [333, "Détails sur les références", "Le nom du champ contenant le TxId doit être \"Identifiant\""], [334, "Details: Note ou Motif", "Si une note ou un motif a été renseignée à l'envoi, ce details doit être affiché"], [335, "Details: Reçu de la transaction", "Avoir un bouton qui permet de télécharger le Reçu de la transaction envoyée"], [336, "Détails sur le bénéficiaire", "Envoyé à Nom du bénéificiaire"], [337, "Détails sur le bénéficiaire", "Pays de l'institution financière du bénéficiaire"], [338, "Détails sur le bénéficiaire", "Nom de l'institution financière du bénéficiaire"], [339, "Détails sur le bénéficiaire", "Alias du bénéficiaire avec le bouton copier si c'est un envoi par alias"], [340, "Détails sur le bénéficiaire", "Avoir un bouton permettant d'enregistrer l'alias du bénéficiare dans les contacts"], [341, "Détails sur le bénéficiaire", "Numéro de compte du bénéficiaire avec le bouton copier si c'est un envoi par numéro de compte ou IBAN"], [342, "Détails: Categorie", "Bouton permettant à l'utilisateur de classer ce transfert dans le cas où la fonctionnalité de budget et d'analytique est offert dans l'app"], [343, "Détails sur la demande d'annulation", "Afficher la date de la demande d'annulation si une demande d'annulation est envoyée"], [344, "Détails sur le retour de fonds", "Afficher la date d'irrevocabilité du retour de fonds si un retour de fonds est effectué"], [345, "Titre", "Demande d'annulation"], [346, "Sous titre", "Quelle est la raison de la demande ?"], [347, "Liste des raisons possibles", "Afficher la liste de toutes les raisons possibles conformément aux spécifications des demandes d'annulation"], [348, "Liste des raisons possibles", "Ne pas utiliser un select pour les raisons - afficher la liste des raisons"], [349, "Bouton \"Demander l'annulation\"", "Déclenche l'envoi de la demande d'annulation sans écran intermédiaire (pas de permission, pas de pop-up, pas d'authentification ) - envoi direct de la demande d'annulation"], [350, "Bouton \"Demander l'annulation\"", "Aprés envoi de la demande, afficher un loader puis un Dialogue de succès de l'envoi de la demande  d'annulation"], [351, "Titre", "Demande d'annulation envoyée"], [352, "Texte", "La demande est en attente d'acceptation.\nVous serez notifié dès que le bénéficiaire aura répondu."], [353, "Bouton \"Continuer\"", "Permet de fermer le dialogue de parcours de demande d'annulation"], [354, "Bouton \"Continuer\"", "Les demandes d'annulation envoyées sont visibles dans les notifications"], [355, "Formulaire de selection des contacts", "Titre doit être \"Partager avec\""], [356, "Formulaire de selection des contacts", "Afficher la barre de recherche d'un contact et permettre de rechercher en utilisant le nom ou le prenom"], [357, "Formulaire de selection des contacts", "Si l'utilisateur n'a pas encore autorisé l'accès aux contacts, la permission doit lui être demandée"], [358, "Formulaire de selection des contacts", "La liste des contacts doit être affichée si l'utilisateur a donné sa permission"], [359, "Formulaire de selection des contacts", "Affichage de l'avatar, du nom et de l'alias du contact ou numéro de téléphone du contact."], [360, "Formulaire de selection des contacts", "Si le contact n'a pas encore d'alias, le numéro de téléphone est affiché en lieu et place de l'alias"], [361, "Formulaire de selection des contacts", "Si le contact a un alias, l'alias est affiché et l'icone PI est affiché en miniature à cote de l'avatar"], [362, "Formulaire de selection des contacts", "Si le contact n'a pas encore d'alias, le Formulaire d'enregistrement de l'alias d'un contact  est affiché avec le nom du contact renseigné et l'utilisateur colle l'alias adresse de paiement"], [363, "Formulaire de selection des contacts", "Si le contact n'a pas encore d'alias, au clic sur le bouton \"Enregistrer et Continuer\" du Formulaire d'enregistrement de l'alias d'un contact, le contact est modifié avec l'ajout de l'alias (tag @PI)"], [364, "Formulaire de selection des contacts", "Si le contact a un alias mais que cet alias n'est pas une adresse de paiement, un message s'affiche l'informant que l'alias doit être une adresse de paiement et non un numéro de téléphone."], [365, "Formulaire de selection des contacts", "Si le contact a un alias mais que cet alias n'est pas une adresse de paiement, le Formulaire d'enregistrement de l'alias d'un contact  est affiché avec le nom du contact renseigné et l'utilisateur colle l'alias adresse de paiement"], [366, "Formulaire de selection des contacts", "Si dans le Formulaire d'enregistrement de l'alias d'un contact, l'utilisateur colle ou saisit un alias de type numéro de téléphone, un message d'erreur doit s'afficher l'informant que l'alias doit être une adresse de paiement et non un numéro de téléphone."], [367, "Formulaire de selection des contacts", "Les contacts selectionnés doivent être visible dans une section entre la barre de recherche et la liste des contacts"], [368, "Formulaire de selection des contacts", "Au clic sur le bouton \"Continuer\", affiche le Fomulaire de partage de paiement"], [369, "Fomulaire de partage de paiement", "Tire doit être \"Partager le paiement\""], [370, "Fomulaire de partage de paiement", "Doit contenir les infos sur le paiement partagé"], [371, "Fomulaire de partage de paiement", "Doit afficher les contacts selectionnés avec un champ de montant pour chacun"], [372, "Fomulaire de partage de paiement", "Par défaut un montant est proposé sur la base d'un opération de division du montant partagé par le nombre de contacts selectionné + 1 (lui meme qui partage) (le montant ne doit pas être un nombre décimal, le reste de la division doit être ajoute à celui qui partage)"], [373, "Fomulaire de partage de paiement", "L'utilisateur peut modifier les montants par défaut affiché"], [374, "Fomulaire de partage de paiement", "Au clic sur le bouton \"Partager le paiement\", le système envoi les demandes de paiement au contact selectionné"], [375, "Fomulaire de partage de paiement", "Les demandes de paiement envoyés doivent être visible dans les notifications"], [376, "Logo de PI-SPI", "Affiche le logo de PI-SPI , variante conforme au thème du PSP"], [377, "Titre de la page", "Doit être \"Reçu de l'envoi\""], [378, "Champ Référence de la transaction", "Titre doit être \"Référence\" et contient le EndToEndId de la transaction"], [379, "Champ Référence de la transaction", "La référence doit être affiché entièrement car l'utilisateur doit pouvoir le copier"], [380, "Champ Identifiant de la transaction", "Titre doit être \"Identifiant\" et contient le TxId de la transaction si elle existe"], [381, "Champ Identifiant de la transaction", "L'identifiant doit être affiché entièrement car l'utilisateur doit pouvoir le copier"], [382, "Champ Montant", "Titre doit être \"Montant\""], [383, "Champ Frais", "Titre doit être \"Frais\""], [384, "Champ Frais", "S'il y'a pas de frais , afficher \"Gratuit\""], [385, "Champ Frais", "S'il y'a des frais, afficher le montant des frais"], [386, "Champ Envoyé à", "Afficher le nom du client payé"], [387, "Champ Alias", "si c'est un envoi par alias, afficher l'alias du client payé"], [388, "Champ Numéro de compte", "si c'est un envoi par numéro de compte, afficher le numéro de compte du client payé"], [389, "Champ Institution Financière", "si c'est un envoi par numéro de compte, afficher le nom du participant payé"], [390, "Champ Date", "Contient la date d'irrévocabilité de la transaction"], [391, "Bouton Partager", "Doit permettre de partager le reçu en affichant les options de partage par défaut disponible sur le téléphone"], [392, "Entête", "Affichage du montant de transaction avec le signe \"+\""], [393, "Entête", "Affichage du nom du client payeur"], [394, "Entête", "Affichage de la date de la transaction au format \"7 juin, 15:17\""], [395, "Entête", "Affichage de l'avatar du client payeur : Si photo non disponible, Utiliser les initiales du nom"], [396, "Actions possibles", "Bouton \"Envoyer\", \"Recevoir\", \"Retourner\""], [397, "Bouton \"Envoyer\"", "Utiliser l'icone du bouton \"Envoyer\""], [398, "Bouton \"Envoyer\"", "Permet d'envoyer au client payeur: ouvre le Formulaire d'envoi par alias si l'alias du payeur est envoyé dans les données du transfert"], [399, "Bouton \"Recevoir\"", "Utiliser l'icone du bouton \"Recevoir\" pour l'envoi des demandes de paiement"], [400, "Bouton \"Recevoir\"", "Permet d'envoyer une demande de paiement au payeur: affiche le Formulaire de demande de paiement"], [401, "Bouton \"Retourner\"", "Permet de retourner les fonds: ouvre un Dialogue de confirmation du retour de fonds"], [402, "Détails sur les références", "Référence unique de la transaction dans PI-SPI (Codifié EndtoEndId dans PI)"], [403, "Détails sur les références", "Le nom du champ doit être \"Référence\""], [404, "Détails sur les références", "Identifiant du marchand, le client payé, (Codifié TxId dans PI)"], [405, "Détails sur les références", "Le nom du champ contenant le TxId doit être \"Identifiant\""], [406, "Details: Note ou Motif", "Si un motif a été renseigné par le payeur, il doit être affiché"], [407, "Details: Reçu de la transaction", "Avoir un bouton qui permet de télécharger le Reçu de la transaction reçue"], [408, "Détails sur l'expéditeur", "Reçu de  Nom du payeur"], [409, "Détails sur l'expéditeur", "Pays de l'institution financière du payeur"], [410, "Détails sur l'expéditeur", "Nom de l'institution financière du payeur"], [411, "Détails sur l'expéditeur", "Alias du payeur avec le bouton copier"], [412, "Détails sur l'expéditeur", "Avoir un bouton permettant d'enregistrer l'alias du payeur dans les contacts"], [413, "Détails: Categorie", "Bouton permettant à l'utilisateur de classer ce transfert dans le cas où la fonctionnalité de budget et d'analytique est offert dans l'app"], [414, "Détails sur la demande d'annulation", "Afficher la date de la demande d'annulation si une demande d'annulation est reçue"], [415, "Détails sur le retour de fonds", "Afficher la date d'irrevocabilité du retour de fonds si un retour de fonds est effectué"], [416, "Titre", "Etes-vous sûr de vouloir retourner les fonds ?"], [417, "Client payeur", "Affichage du nom du client payeur"], [418, "Montant", "Affichage du montant de la transaction"], [419, "Montant", "Si le solde est inférieur au montant, un avertissement est affiché pour l'indiquer et le bouton \"OUI\" est grisé"], [420, "Bouton de confirmation \"NON\"", "Le bouton \"NON\" est affiché et permet de ne plus retourner les fonds: le dialogue se ferme et on revient sur les détails"], [421, "Bouton de confirmation \"OUI\"", "Si le solde est suffisant, le bouton \"OUI\" est affiché et actif"], [422, "Bouton de confirmation \"OUI\"", "On demande la double authentification à l'utilisateur par biométrie ou code PIN - aprés authentification, le retour de fonds peut être envoyé"], [423, "Bouton de confirmation \"OUI\"", "Aprés envoi du retour de fonds, un loader doit s'afficher, le temps de recevoir la notification de succès ou d'echec de l'envoi"], [424, "Bouton de confirmation \"OUI\"", "Lorsque la transaction est irrévocable, afficher le dialogue de succès"], [425, "Bouton de confirmation \"OUI\"", "Lorsque la transaction est rejetée, afficher le dialogue d'echec avec le bon message d'erreur correspondant au motif de rejet"], [426, "Bouton de confirmation \"OUI\"", "Lorsque la transaction est toujours initiée après le timeout de 30s ( ce qui doit arriver exceptionnement), afficher un dialogue avec le message d'erreur indiquant cela."], [427, "Logo de PI-SPI", "Affiche le logo de PI-SPI , variante conforme au thème du PSP"], [428, "Titre de la page", "Doit être \"Reçu de l'envoi\""], [429, "Champ Référence de la transaction", "Titre doit être \"Référence\" et contient le EndToEndId de la transaction"], [430, "Champ Référence de la transaction", "La référence doit être affiché entièrement car l'utilisateur doit pouvoir le copier"], [431, "Champ Identifiant de la transaction", "Titre doit être \"Identifiant\" et contient le TxId de la transaction si elle existe"], [432, "Champ Identifiant de la transaction", "L'identifiant doit être affiché entièrement car l'utilisateur doit pouvoir le copier"], [433, "Champ Montant", "Titre doit être \"Montant\""], [434, "Champ Frais", "Titre doit être \"Frais\""], [435, "Champ Frais", "S'il y'a pas de frais , afficher \"Gratuit\""], [436, "Champ Frais", "S'il y'a des frais, afficher le montant des frais"], [437, "Champ Reçu de", "Afficher le nom du client payeur"], [438, "Champ Alias", "Afficher l'alias du client payeur"], [439, "Champ Date", "Contient la date d'irrévocabilité de la transaction"], [440, "Bouton Partager", "Doit permettre de partager le reçu en affichant les options de partage par défaut disponible sur le téléphone"], [441, "Types de notification", "Affiche les notifications sur les transferts rejetés ou echoués dans la catégorie Transfert"], [442, "Affichage d'une notification", "Icone transfert, comme sur le bouton envoyer"], [443, "Affichage d'une notification", "Titre d'une notification \"Transaction échoué\""], [444, "Affichage d'une notification", "Sous titre d'une notification de transfert de fonds echoué\n\"Envoi à Nom du Client payé\""], [445, "Affichage d'une notification", "Sous titre d'une notification de retour de fonds echoué\n\"Retour à Nom du Client payeur\""], [446, "Affichage d'une notification", "Afficher le montant de la transaction échouée à l'envoi"], [447, "Entête de la page", "Afficher le montant de la transaction échouée à l'envoi"], [448, "Entête de la page", "Afficher le nom du client payé pour un transfert de fonds echoué"], [449, "Entête de la page", "Afficher le nom du client payeur pour un retour de fonds echoué"], [450, "Entête de la page", "Afficher la photo ou le logo du client payé pour un transfert de fonds echoué"], [451, "Entête de la page", "Afficher la photo ou le logo du client payé pour un retour de fonds echoué"], [452, "Données de la transaction echouée", "Affichage du pays du client payé (participant du client payé)"], [453, "Données de la transaction echouée", "Affichage de l'alias du client payé pour un transfert de fonds echoué"], [454, "Données de la transaction echouée", "Affichage d'un bouton copier pour pouvoir copier l'alias du client payé"], [455, "Données de la transaction echouée", "Référence unique de la transaction dans PI-SPI (Codifié EndtoEndId dans PI)"], [456, "Données de la transaction echouée", "Le nom du champ contenant le EndtoEndId doit être \"Référence\""], [457, "Données de la transaction echouée", "Un bouton copier doit permettre de copier la référence"], [458, "Données de la transaction echouée", "Identifiant du marchand, le client payé, (Codifié TxId dans PI)"], [459, "Données de la transaction echouée", "Le nom du champ contenant le TxId doit être \"Identifiant\""], [460, "Données de la transaction echouée", "Un bouton copier doit permettre de copier l'identifiant"], [461, "Données de la transaction echouée", "Si une note ou un motif a été renseignée à l'envoi, ce details doit être affiché"], [462, "Données de la transaction echouée", "Afficher la raison du rejet - une description du rejet et non le code technique PI-SPI"], [463, "Types de notification", "Affiche les notifications sur les demandes d'annulation dans la catégorie \"Annulation\""], [464, "Affichage d'une notification", "Icone de demande d'annulation"], [465, "Affichage d'une notification", "Titre d'une notification de demande reçue \"Annulation\""], [466, "Affichage d'une notification", "Titre d'une notification de demande rejetée \"Annulation rejetée\""], [467, "Affichage d'une notification", "Sous titre d'une notification de demande reçue \"Demandée par Nom du Client payeur\""], [468, "Affichage d'une notification", "Sous titre d'une notification de demande rejetée \"Demandée à Nom du Client payé\""], [469, "Entête de la page", "Afficher le type de notification \"Demande d'annulation\""], [470, "Entête de la page", "Afficher le montant de la demande d'annulation"], [471, "Entête de la page", "Afficher la référence de la transaction (EndToEndId)"], [472, "Entête de la page", "Afficher un bouton \"copier\" à coté de la référence de la transaction"], [473, "Données de la demande d'annulation reçue", "Reçu de \"Nom du client Payeur\""], [474, "Données de la demande d'annulation reçue", "Reçu à \"Date de reception de la demande d'annulation\""], [475, "Données de la demande d'annulation reçue", "Pays \"Pays du participant du client payeur\""], [476, "Données de la demande", "Affichage de la date de la demande d'annulation"], [477, "Données de la demande", "Affichage de la raison de la demande d'annulation"], [478, "Données de la demande", "Affichage du statut de la demande \"En attente\" si la demande n'est pas encore acceptée ou rejetée"], [479, "Actions sur la page", "Bouton \"Rejeter\": pour rejeter la demande d'annulation"], [480, "Actions sur la page", "Bouton \"Accepter\": pour accepter la demande d'annulation"], [481, "Bouton \"Rejeter\"", "Au clic sur le bouton, le PSP doit rejeter la demande d'annulation et afficher le Dialogue de succès de rejet de la demande d'annulation"], [482, "Dialogue de succès de rejet de la demande d'annulation", "Doit afficher le message \"La demande d'annulation est rejetée avec succès\""], [483, "Bouton \"Accepter\"", "On demande la double authentification à l'utilisateur par biométrie ou code PIN - aprés authentification, le retour de fonds peut être envoyé"], [484, "Bouton \"Accepter\"", "Aprés envoi du retour de fonds, un loader doit s'afficher, le temps de recevoir la notification de succès ou d'echec de l'envoi"], [485, "Bouton \"Accepter\"", "Lorsque la transaction est irrévocable, afficher le dialogue de succès"], [486, "Bouton \"Accepter\"", "Lorsque la transaction est rejetée, afficher le dialogue d'echec avec le bon message d'erreur correspondant au motif de rejet"], [487, "Bouton \"Accepter\"", "Lorsque la transaction est toujours initiée après le timeout de 30s ( ce qui doit arriver exceptionnement), afficher un dialogue avec le message d'erreur indiquant cela."], [488, "Types de notification", "Affiche les notifications sur les demandes de paiement"], [489, "Affichage d'une notification", "Icone demander le paiement, le bouton recevoir"], [490, "Affichage d'une notification", "Titre d'une notification \"Demande de paiement\""], [491, "Affichage d'une notification", "Sous titre d'une notification \"Demandée à Nom du Client\""], [492, "Entête de la page", "Afficher le type de notification \"Demande de paiement\""], [493, "Entête de la page", "Afficher le montant demandé"], [494, "Entête de la page", "Afficher le nom du client \"Vous avez demandé à Nom Du Client payé\""], [495, "Entête de la page", "Afficher la photo ou le logo du client payé"], [496, "Données de la demande", "Affichage du pays du client payé (participant du client payé)"], [497, "Données de la demande", "Affichage de l'alias du client payé"], [498, "Données de la demande", "Affichage d'un bouton copier pour pouvoir copier l'alias du client payé"], [499, "Données de la demande", "Ajout d'un processus bouton ou appui long permettant d'enregistrer l'alias dans les contacts: afficher un bouton \"Enregistrer dans les contacts\""], [500, "Données de la demande", "Affichage de la date d'échéance"], [501, "Données de la demande", "Affichage du statut de la demande \"En attente\" si la demande n'est pas encore acceptée ou rejetée"], [502, "Données de la demande de paiement partagé", "Lorsqu'il s'agit d'un paiement partagé, dans les détails, nous voyons les details du paiement partagé"], [503, "Données de la demande de paiement partagé", "Afficher les details du paiement partagé: nom du client payé"], [504, "Données de la demande de paiement partagé", "Afficher les details du paiement partagé: montant du paiement"], [505, "Données de la demande de paiement partagé", "Afficher les details du paiement partagé: date du paiement"], [506, "Données de la demande de paiement partagé", "Afficher les details du paiement partagé: avatar du client payé"], [507, "Rechercher une transaction", "Afficher la barre de recherche pour permettre de rechercher en utilisant le nom et le prénom du client"], [508, "Rechercher une transaction", "La barre de recherche doit permettre de rechercher en utilisant la référence de la transaction"], [509, "Rechercher une transaction", "La barre de recherche doit permettre de rechercher en utilisant l'alias du client"], [510, "Rechercher une transaction", "La barre de recherche doit permettre de rechercher en utilisant le montant de la transaction"], [511, "Rechercher une transaction", "Affiche un bouton permettant d'ouvrir la page de selection des critères de recherche"], [512, "Liste des transactions", "La liste des transactions est affichée et les transactions sont triés selon la date d'irrévocabilité (le plus récent affiché en premier) et regroupées par jour"], [513, "Liste des transactions", "Pour une transaction de la liste, il faut afficher le nom du client:\nsi c'est une transaction reçue, c'est le nom du payeur sinon c'est le nom du payé"], [514, "Liste des transactions", "Pour une transaction de la liste, il faut afficher l'avatar du client:\nsi l'image existe, afficher la photo , sinon deux lettres correspondant à la première lettre du prénom et la première lettre du nom"], [515, "Liste des transactions", "Pour une transaction de la liste, il faut afficher le montant de la transaction:\nSi c'est une transaction reçue, le montant s'affiche sans préfixe, Sinon le signe - est affiché avant le montant"], [516, "Liste des transactions", "Pour une transaction de la liste, il faut afficher la date de l'opération au format \"7 juin, 11:56\""], [517, "Filtrer selon une plage de dates", "Permettre de selectionner une date de debut: la date d'irrévocabilité de la transaction recherchée est supérieure ou égale à cette date de début"], [518, "Filtrer selon une plage de dates", "Permettre de selectionner une date de fin: la date d'irrévocabilité de la transaction recherchée est inférieure ou égale à cette date de fin"], [519, "Filtrer les transactions reçues", "Permettre de rechercher les transactions reçues"], [520, "Filtrer les transactions envoyés", "Permettre de rechercher les transactions envoyés"], [521, "Filtrer les transactions par catégorie", "Permettre de rechercher par catégorie, si le participant fournit cette fonctionnalité"], [522, "Bouton \"Appliquer\"", "Permet de lancer la recherche avec les critères selectionnés, puis de retourner sur la liste des transactions"], [523, "Rechercher un contact", "Afficher la barre de recherche d'un contact et permettre de rechercher en utilisant le nom ou le prenom"], [524, "Rechercher un contact", "Lorsque l'utilisateur commence à rechercher, les autres options d'envoi sont cachées"], [525, "Rechercher un contact", "Lorsque l'utilisateur finit de rechercher, les autres options d'envoi sont réaffichées"], [526, "Scanner un QR Code", "Un bouton permattant de scanner un QR Code pour envoyer la demande de paiement doit être disponible sur la page à côte du champ de recherche d'un contact"], [527, "Scanner un QR Code", "Au clic sur ce bouton, la Page de scan de QR Code est ouverte"], [528, "Options", "Titre de la section \"Demande de paiement\""], [529, "Option: Par alias", "Le titre doit être \"Par Alias\""], [530, "Option: Par alias", "Le sous-titre doit être \"Adresse de paiement du destinataire\""], [531, "Option: Par alias", "Au clic, le Formulaire de demande de paiement par alias est affiché"], [532, "Option: Nouveau contact", "Le titre doit être \"Nouveau contact\""], [533, "Option: Nouveau contact", "Le sous-titre doit être \"Ajouter un contact avec son alias\""], [534, "Transactions recentes", "Titre de la section \"Transactions récentes\""], [535, "Transactions recentes", "Affichage des 2 dernières transactions récentes dont l'autre partie (payeur ou payé) a un alias adresse de paiement"], [536, "Transactions recentes", "Pour une transaction de la liste, il faut afficher le nom du client:\nsi c'est une transaction reçue, c'est le nom du payeur sinon c'est le nom du payé"], [537, "Transactions recentes", "Pour une transaction de la liste, il faut afficher l'avatar du client:\nsi l'image existe, afficher la photo , sinon deux lettres correspondant à la première lettre du prénom et la première lettre du nom"], [538, "Transactions recentes", "Pour une transaction de la liste, il faut afficher le montant de la transaction:  il faut qu\"on puisse savoir visuellement qu'il s'agit d'un envoi ou d'une reception"], [539, "Transactions recentes", "Pour une transaction de la liste, il faut afficher la date de l'opération"], [540, "Transactions recentes", "Lorsqu'on selectionne une transaction de la liste, le Formulaire de demande de paiement par alias s'affiche avec l'alias et le montant pré-renseigné"], [541, "Liste des contacts", "Titre de la section \"Contacts\""], [542, "Liste des contacts", "Si l'utilisateur n'a pas encore autorisé l'accès aux contacts, la permission doit lui être demandée"], [543, "Liste des contacts", "Présence obligatoire: la liste des contacts doit être affichée si l'utilisateur a donné sa permission"], [544, "Liste des contacts", "Affichage de l'avatar, du nom et de l'alias du contact ou numéro de téléphone du contact."], [545, "Liste des contacts", "Si le contact n'a pas encore d'alias, le numéro de téléphone est affiché en lieu et place de l'alias"], [546, "Liste des contacts", "Si le contact a un alias, l'alias est affiché et l'icone PI est affiché en miniature à cote de l'avatar"], [547, "Selection d'un contact", "Si le contact n'a pas encore d'alias, le Formulaire d'envoi à un nouveau contact  est affiché avec le nom du contact renseigné et l'utilisateur saisit ou colle juste l'alias adresse de paiement"], [548, "Selection d'un contact", "Si le contact n'a pas encore d'alias, au clic sur le bouton \"Enregistrer et Continuer\" du Formulaire d'envoi à un nouveau contact, le contact est modifié avec l'ajout de l'alias (tag @PI)"], [549, "Selection d'un contact", "Si le contact a un alias de type adresse de paiement, le Formulaire de demande de paiement à un contact  est affiché"], [550, "Selection d'un contact", "Si le contact a un alias de type numéro de téléphone, un message d'avertissement s'affiche \"L'alias Numéro de téléphone ne peut pas être utilisé pour les demandes de paiement\""], [551, "Selection d'un contact", "Si le contact a un alias de type numéro de téléphone, en plus du message d'avertissement, afficher le formulaire de modification de l'alias pour faciliter l'enregistrement de l'adresse de paiement pour ce contact"], [552, "Flux caméra", "Flux caméra activé sur la page de scan de Qr Code"], [553, "Actions sur la page", "Bouton pour que la lampe torche s'allume"], [554, "Actions sur la page", "Afficher en bas de la page de scan de qr code les boutons \"Scanner\" et \"Mon Code\" - Voir dans exigences minimales (switch)"], [555, "Flux caméra", "Si le client scanne un QR Code PI valide, il est redirigé sur le formulaire de demande de paiement par QR Code si le QR Code ne contient pas de montant"], [556, "Flux caméra", "Si le client scanne un QR Code PI valide et si le QR Code contient un montant, la demande de paiement est envoyée automatiquement"], [557, "Flux caméra", "Si le client selectionne un QR Code PI valide qui contient un reference label, le motif de la demande de paiement doit contenir la valeur du ReferenceLabel du QR Code"], [558, "Importation d'image", "Présence d'un bouton permettant de selectionner une image depuis la galerie"], [559, "Importation d'image", "Si le QR Code selectionné est invalide, le message d'erreur est affiché"], [560, "Importation d'image", "Si le client selectionne un QR Code PI valide, il est redirigé sur le formulaire de demande de paiement par QR Code si le QR Code ne contient pas de montant"], [561, "Importation d'image", "Si le client selectionne un QR Code PI valide qui contient un montant, la demande de paiement est envoyée automatiquement"], [562, "Bouton \"Mon Code\"", "Permet d'afficher la page \"Mon Code\""], [563, "Titre de la page", "Demande de paiement par QR Code"], [564, "Champ Montant", "Accepte que des chiffres"], [565, "Champ Montant", "n'accepte pas les nombres décimaux"], [566, "Champ Montant", "Le montant demandé peut être supérieur au solde"], [567, "Champ Note ou Motif", "Maximum 140 caractères"], [568, "Bouton \"Envoyer\"", "Au clic - on rècupère la position GPS de l'utilisateur - on demande la permission à l'utilisateur si pas encore accordée la première fois - avant d'envoyer la demande"], [569, "Bouton \"Envoyer\"", "Aprés envoi de la demande de paiement, un loader doit s'afficher, le temps de recevoir la notification de succès ou d'echec de l'envoi"], [570, "Bouton \"Envoyer\"", "Une notification est envoyée à l'utilsateur (le payé) aprés effectivité de l'envoi; la demande peut être consultée à partir du menu notifications"], [571, "Titre de la page", "Demande de paiement"], [572, "Sous titre de la page", "Coller ou saisisser l'alias"], [573, "Ordre d'affichage des champs: Alias, Montant, Note", "L'ordre doit être respecté"], [574, "Champ Alias", "Editable: accepte une adresse de paiement"], [575, "Champ Alias", "Bouton coller permettant de coller un alias"], [576, "Champ Alias", "Message d'erreur en dessous du champ si le format de l'alias est invalide (pas une adresse de paiement -  UUID v4)"], [577, "Champ Montant", "Accepte que des chiffres"], [578, "Champ Montant", "n'accepte pas les nombres décimaux"], [579, "Champ Montant", "Le montant demandé peut être supérieur au solde"], [580, "Champ Note ou Motif", "Maximum 140 caractères"], [581, "Bouton \"Envoyer\"", "Au clic - on rècupère la position GPS de l'utilisateur - on demande la permission à l'utilisateur si pas encore accordée la première fois - avant d'envoyer la demande"], [582, "Bouton \"Envoyer\"", "Aprés envoi de la demande de paiement, un loader doit s'afficher, le temps de recevoir la notification de succès ou d'echec de l'envoi"], [583, "Bouton \"Envoyer\"", "Une notification est envoyée à l'utilsateur (le payé) aprés effectivité de l'envoi; la demande peut être consultée à partir du menu notifications"], [584, "Entête de la page", "Doit afficher le nom du contact"], [585, "Entête de la page", "Doit afficher l'avatar du contact"], [586, "Entête de la page", "Doit afficher l'alias du contact"], [587, "Champ Montant", "Accepte que des chiffres"], [588, "Champ Montant", "n'accepte pas les nombres décimaux"], [589, "Champ Montant", "Le montant demandé peut être supérieur au solde"], [590, "Champ Note ou Motif", "Maximum 140 caractères"], [591, "Bouton \"Envoyer\"", "Au clic - on rècupère la position GPS de l'utilisateur - on demande la permission à l'utilisateur si pas encore accordée la première fois - avant d'envoyer la demande"], [592, "Bouton \"Envoyer\"", "Aprés envoi de la demande de paiement, un loader doit s'afficher, le temps de recevoir la notification de succès ou d'echec de l'envoi"], [593, "Bouton \"Envoyer\"", "Une notification est envoyée à l'utilsateur (le payé) aprés effectivité de l'envoi; la demande peut être consultée à partir du menu notifications"], [594, "Types de notification", "Affiche les notifications sur les demandes de paiement"], [595, "Affichage d'une notification", "Icone demander le paiement, le bouton recevoir"], [596, "Affichage d'une notification", "Titre d'une notification \"Demande de paiement\""], [597, "Affichage d'une notification", "Sous titre d'une notification \"Demandée par Nom du Client\""], [598, "Entête de la page", "Afficher le type de notification \"Demande de paiement\""], [599, "Entête de la page", "Afficher le montant demandé"], [600, "Entête de la page", "Afficher le nom du client \"Demandé par Nom Du Client payé\""], [601, "Entête de la page", "Afficher la photo ou le logo du client payé"], [602, "Données de la demande", "Affichage du pays du client payé (participant du client payé)"], [603, "Données de la demande", "Affichage de l'alias du client payé"], [604, "Données de la demande", "Affichage d'un bouton copier pour pouvoir copier l'alias du client payé"], [605, "Données de la demande", "Ajout d'un processus (bouton ou appui long) permettant d'enregistrer l'alias dans les contacts: afficher un bouton \"Enregistrer dans les contacts\""], [606, "Données de la demande", "Affichage de la date de la demande"], [607, "Données de la demande", "Affichage de la date d'échéance"], [608, "Données de la demande", "Affichage du statut de la demande \"En attente\" si la demande n'est pas encore acceptée ou rejetée"], [609, "Données de la demande", "Affichage du motif de la demande"], [610, "Données de la demande de paiement partagé", "Lorsqu'il s'agit d'un paiement partagé, dans les détails, nous voyons les details du paiement partagé"], [611, "Données de la demande de paiement partagé", "Afficher les details du paiement partagé: nom du client payé"], [612, "Données de la demande de paiement partagé", "Afficher les details du paiement partagé: montant du paiement"], [613, "Données de la demande de paiement partagé", "Afficher les details du paiement partagé: date du paiement"], [614, "Données de la demande de paiement partagé", "Afficher les details du paiement partagé: avatar du client payé"], [615, "Données de la demande de paiement PICO", "Titre de la section: Retrait avec Achat (PICO)"], [616, "Données de la demande de paiement PICO", "Afficher le montant de l'achat"], [617, "Données de la demande de paiement PICO", "Afficher le montant du retrait"], [618, "Données de la demande de paiement PICO", "Afficher les frais: \"Gratuit\" s'il n'y a pas de frais"], [619, "Données de la demande de paiement PICO", "Afficher les frais: le montant s'il y'a des frais"], [620, "Données de la demande de paiement PICASH", "Titre de la section: Retrait avec Achat (PICASH)"], [621, "Données de la demande de paiement PICASH", "Afficher le montant du retrait"], [622, "Données de la demande de paiement PICASH", "Afficher les frais: \"Gratuit\" s'il n'y a pas de frais"], [623, "Données de la demande de paiement PICASH", "Afficher les frais: le montant s'il y'a des frais"], [624, "Données de la demande de paiement avec débit différé", "Titre de la section: Débit différé"], [625, "Données de la demande de paiement avec débit différé", "Afficher le message \"Achetez maintenant, Payez plus tard. Votre compte sera débité à la fin du mois\" s'il s'agit d'une demande de paiement avec débit différé"], [626, "Données de la demande de paiement avec débit différé", "S'il s'agit d'une demande de paiement avec débit différé et que le PSP propose un service à plusieurs mensualités, afficher\n\"Payer en X menusalités\" (X étant le nombre de mensualités)\nY par mois (Y étant le montant payé par mois)"], [627, "Données de la demande de paiement de Facture", "S'il y'a un document de référence, le type du document et le numéro du document de référence doivent être affichés"], [628, "Données de la demande de paiement de Facture", "S'il y'a une remise, la remise doit être affichée avec la date limite de validité de la remise"], [629, "Données de la demande de paiement en ligne", "Afficher la mention \"Site e-commerce vérifiée\" si c'est une demande de paiement avec le canal 521"], [630, "Données de la demande de paiement en ligne", "Le bouton programmer n'est pas affiché pour une demande de paiement en ligne"], [631, "Données de la demande de paiement en ligne", "Le logo du Site e-commerce doit être affiché si l'alias du client payé contient cette info"], [632, "Bouton Icone calendrier pour programmer la paiement", "Au clic sur le bouton, c'est le parcours de création d'un paiement programmé qui commence à partir d'ici"], [633, "Avertissement de sécurité", "Lorsque c'est une demande de paiement avec le canal 631, l'alias du client payé doit être dans les contacts pour que les boutons Payer et Programmer soit activés"], [634, "Avertissement de sécurité", "Lorsque c'est une demande de paiement avec le canal 631, si l'alias du client payé n'est pas dans les contacts, un avertissement s'affiche (Voir dans exigences minimales)"], [635, "Bouton \"Rejeter\"", "Au clic sur le bouton, le PSP doit afficher le Dialogue de rejet de la demande de paiement"], [636, "Bouton \"Payer\"", "Au clic - on rècupère la position GPS de l'utilisateur - on demande la permission à l'utilisateur si pas encore accordée la première fois"], [637, "Bouton \"Payer\"", "On demande la double authentification à l'utilisateur par biométrie ou code PIN - aprés authentification, l'ordre de transfert peut être envoyé"], [638, "Bouton \"Payer\"", "Aprés envoi de l'ordre de transfert, un loader doit s'afficher, le temps de recevoir la notification de succès ou d'echec de l'envoi"], [639, "Bouton \"Payer\"", "Lorsque la transaction est irrévocable, afficher le dialogue de succès"], [640, "Bouton \"Payer\"", "Lorsque la transaction est rejetée, afficher le dialogue d'echec avec le bon message d'erreur correspondant au motif de rejet"], [641, "Bouton \"Payer\"", "Lorsque la transaction est toujours initiée après le timeout de 30s ( ce qui doit arriver exceptionnement), afficher un dialogue avec le message d'erreur indiquant cela."], [642, "Liste des motifs de rejet", "Doit afficher la liste des motifs de rejet pour que le client puisse choisir un motif de rejet (Ne pas utiliser un select - tout afficher)"], [643, "Bouton \"Rejeter\"", "Au clic sur le bouton, le PSP doit rejeter la demande et afficher un Dialogue de succès du rejet de la demande de paiement"], [644, "Texte", "Doit afficher le message \"La demande de paiement est rejetée avec succès\""], [645, "Liste vide (l'utilisateur n'a pas créé d'abonnement)", "Afficher le titre \"Transactions à venir\""], [646, "Liste vide (l'utilisateur n'a pas créé d'abonnement)", "Afficher le sous titre \"Gérez vos abonnements et vos paiements programmés en un seul endroit\""], [647, "Liste vide (l'utilisateur n'a pas créé d'abonnement)", "Afficher le boutton \"Nouveau\""], [648, "Bouton \"Nouveau\"", "Au clic sur ce bouton, un dialogue , bottom sheet,  est affiché avec les deux boutons \"Programmer un envoi\" et \"Créer un abonnement\""], [649, "Bouton \"Programmer un envoi\"", "Sous titre du bouton doit être \"Executer un envoi à une date donnée\""], [650, "Bouton \"Créer un abonnement\"", "Sous titre du bouton doit être \"Convertir un envoi en un abonnement\""], [651, "Bouton \"Créer un abonnement\"", "Au clic, affiche la Page de création d'un abonnement"], [652, "Liste non vide", "Afficher la liste des Abonnements et des Envois programmés.\n- Liste des Abonnements est groupés dans une section Abonnements avec un bouton \"+\"\n- Liste des Envois programmés est groupés dans une section Envois programmés avec un bouton \"+\""], [653, "Liste non vide", "Bouton plus (+) de la section Envois programmés agit comme le Bouton \"Programmer un envoi\""], [654, "Liste non vide", "Bouton plus (+) de la section Abonnement agit comme le Bouton \"Créer un abonnement\""], [655, "Liste non vide", "S'il n'ya qu'un seul paiement programmé ou abonnement, c'est uniquement la liste correspondante qui est affichée avec un bouton \"+\" qui agit comme le bouton \"Nouveau\""], [656, "Titre", "Afficher le titre \"Créer un abonnement\""], [657, "Sous titre", "Afficher le sous titre \"Recherchez dans vos transactions et sélectionnez un envoi recurrent\""], [658, "Liste des envois émis", "Afficher la liste des transactions émises avec possibilité d'en selectionner une"], [659, "Bouton \"Confirmer\"", "Afficher le bouton \"Confirmer\" quand une transaction est sélectionnée."], [660, "Bouton \"Confirmer\"", "Au clic sur ce bouton, l'abonnement est créé avec une fréquence par défaut determinée à partir de l'historique des transactions"], [661, "Bouton \"Confirmer\"", "Aprés création de l'abonnement, la page Détails d'un abonnement est affichée à l'utilisateur"], [662, "Rechercher un contact", "Afficher la barre de recherche d'un contact et permettre de rechercher en utilisant le nom ou le prenom"], [663, "Rechercher un contact", "Lorsque l'utilisateur commence à rechercher, les autres options d'envoi sont cachées"], [664, "Rechercher un contact", "Lorsque l'utilisateur finit de rechercher, les autres options d'envoi sont réaffichées"], [665, "Scanner un QR Code", "Un bouton permettant de scanner un QR Code pour faire un envoi doit être disponible sur la page à côte du champ de recherche d'un contact"], [666, "Scanner un QR Code", "C'est le parcours de la Page \"Scanner\" qui commence au clic de ce bouton"], [667, "Options", "Titre de la section \"Envoyer\""], [668, "Option: Par alias", "Le titre doit être \"Par Alias\""], [669, "Option: Par alias", "Le sous-titre doit être \"Adresse de paiement ou n° de téléphone\""], [670, "Option: Par numéro de compte", "Le titre doit être \"Par numéro de compte\""], [671, "Option: Par numéro de compte", "Le sous-titre doit être \"RIB, IBAN, n° de téléphone ou autre\""], [672, "Option: Par IBAN", "Accepté que pour ceux qui ont l'ancienne version et qui ont déja implémenté ce bouton, Ne pas accepter cette option pour les nouveaux participants"], [673, "Option: Nouveau contact", "Le titre doit être \"Nouveau contact\""], [674, "Option: Nouveau contact", "Le sous-titre doit être \"Ajouter un contact avec son alias\""], [675, "Transactions recentes", "Titre de la section \"Transactions récentes\""], [676, "Transactions recentes", "Affichage des 2 dernières transactions récentes"], [677, "Transactions recentes", "Pour une transaction de la liste, il faut afficher le nom du client:\nsi c'est une transaction reçue, c'est le nom du payeur sinon c'est le nom du payé"], [678, "Transactions recentes", "Pour une transaction de la liste, il faut afficher l'avatar du client:\nsi l'image existe, afficher la photo , sinon deux lettres correspondant à la première lettre du prénom et la première lettre du nom"], [679, "Transactions recentes", "Pour une transaction de la liste, il faut afficher le montant de la transaction:  il faut qu\"on puisse savoir visuellement qu'il s'agit d'un envoi ou d'une reception"], [680, "Transactions recentes", "Pour une transaction de la liste, il faut afficher la date de l'opération"], [681, "Transactions recentes", "Lorsqu'on selectionne une transaction de la liste, le formulaire correspondant s'affiche:\n- envoi par alias ci 'était un envoi par alias avec l'alias et le montant prérempli\n- envoi par numéro de compte si c'était un envoi par numéro de compte avec le numéro de compte et le montant prérempli"], [682, "Liste des contacts", "Titre de la section \"Contacts\""], [683, "Liste des contacts", "Si l'utilisateur n'a pas encore autorisé l'accès aux contacts, la permission doit lui être demandée"], [684, "Liste des contacts", "Présence obligatoire: la liste des contacts doit être affichée si l'utilisateur a donné sa permission"], [685, "Liste des contacts", "Affichage de l'avatar, du nom et de l'alias du contact ou numéro de téléphone du contact."], [686, "Liste des contacts", "Si le contact n'a pas encore d'alias, le numéro de téléphone est affiché en lieu et place de l'alias"], [687, "Liste des contacts", "Si le contact a un alias, l'alias est affiché et l'icone PI est affiché en miniature à cote de l'avatar"], [688, "Selection d'un contact", "Si le contact n'a pas encore d'alias, le Formulaire d'envoi à un nouveau contact  est affiché avec le nom du contact renseigné et l'utilisateur saisit ou colle juste l'alias"], [689, "Selection d'un contact", "Si le contact n'a pas encore d'alias, au clic sur le bouton \"Enregistrer et Continuer\" du Formulaire d'envoi à un nouveau contact, le contact est modifié avec l'ajout de l'alias (tag @PI)"], [690, "Selection d'un contact", "Si le contact a un alias, le Formulaire d'envoi à un contact est affiché"], [691, "Titre de la page", "Envoyer par Alias ou Envoi par alias"], [692, "Sous titre de la page", "Coller ou saisisser l'alias"], [693, "Ordre d'affichage des champs: Alias, Montant, Note", "L'ordre doit être respecté"], [694, "Champ Alias", "Editable: accepte des numéros de téléphone avec indicatif pays"], [695, "Champ Alias", "Editable: accepte une adresse de paiement"], [696, "Champ Alias", "Editable: permet de rechercher et de choisir un contact"], [697, "Champ Alias", "Bouton coller permettant de coller un alias"], [698, "Champ Alias", "Message d'erreur en dessous du champ si le format de l'alias est invalide ni un numéro de téléphone, ni un UUID v4"], [699, "Champ Montant", "Accepte que des chiffres"], [700, "Champ Montant", "n'accepte pas les nombres décimaux"], [701, "Champ Note ou Motif", "Champ optionnel"], [702, "Champ Note ou Motif", "Maximum 140 caractères"], [703, "Bouton \"Continuer\"", "Le clic sur ce bouton affiche la page de confirmation de l'envoi"], [704, "Champ Institution financière", "Les institutions financières du pays selectionné sont affichés uniquement - pas toute la liste"], [705, "Titre de la page", "Confirmation"], [706, "Sous titre de la page", "Voulez-vous vraiment effectuer un transfert au profit de ce bénéficiaire"], [707, "Champ Alias", "Affiche la valeur de l'alias du bénéficiare"], [708, "Champ Pays", "Affiche le pays du bénéficiare"], [709, "Champ Institution financière", "Affiche le nom du participant bénéficiare"], [710, "Champ Nom du bénéficiaire", "Affiche le nom complet du bénéficiaire tel que retourné par la recherche d'alias"], [711, "Champ Montant", "Affiche le montant de la transaction"], [712, "Champ Frais", "Affiche gratuit si l'envoi est gratuit selon les règles de PI"], [713, "Champ Frais", "Affiche le montant des frais si l'envoi est facturé selon les règles de PI (transfert transfontalier par exemple)"], [714, "Champ Note ou Motif", "Affiche le motif renseigné par le client à l'étape précédente"], [715, "Bouton \"Annuler\"", "Permet d'annuler l'envoi et de revenir sur la Page \"Options d'envoi\""], [716, "Bouton \"Programmer\"", "Au clic - on afiiche la page Programmer"], [717, "Bouton \"Confirmer\"", "On demande la double authentification à l'utilisateur par biométrie ou code PIN - aprés authentification, l'ordre de la création de l'abonnement peut être envoyé"], [718, "Bouton \"Confirmer\"", "Aprés envoi de l'ordre de la création de l'abonnement , un loader doit s'afficher, le temps de recevoir la notification de succès ou d'echec de la programmation"], [719, "Bouton \"Confirmer\"", "Lorsque l'abonnement est créé, afficher le dialogue de succès"], [720, "Bouton \"Confirmer\"", "Lorsque l'abonnement est rejetée, afficher le dialogue d'echec avec le bon message d'erreur correspondant au motif de rejet"], [721, "Titre de la page", "Envoyer par numéro de compte ou Envoi par par numéro de compte"], [722, "Sous titre de la page", "RIB, IBAN, n° de téléphone ou autre identifiant"], [723, "Ordre d'affichage des champs: Numéro de compte, Pays, Institution financière, Montant, Note", "L'ordre doit être respecté"], [724, "Champ \"Numéro de compte\"", "Titre du champ \"Numéro de compte\""], [725, "Champ \"Numéro de compte\"", "minimum 1 caractère"], [726, "Champ \"Numéro de compte\"", "maximum 34 caractères"], [727, "Champ \"Numéro de compte\"", "Accepte des numéros de telephone sans indicatif"], [728, "Champ \"Numéro de compte\"", "Accepte des numéros de telephone avec indicatif"], [729, "Champ \"Numéro de compte\"", "Permet de rechercher un contact et de selectionner un contact"], [730, "Champ \"Numéro de compte\"", "Accepte un IBAN"], [731, "Champ \"Numéro de compte\"", "Accepte un RIB"], [732, "Champ \"Numéro de compte\"", "Accepte n'importe quel numéro de compte qu'une institution peut utiliser"], [733, "Champ \"Numéro de compte\"", "Un bouton coller qui permet de coller un numéro de compte sur le champ"], [734, "Champ Pays", "Titre du champ \"Pays du bénéficiaire\""], [735, "Champ Pays", "Si le numéro de compte est un IBAN, le pays est déduit de l'IBAN et le champ n'est pas modifiable par le client"], [736, "Champ Pays", "Si le numéro de compte n'est pas un IBAN, le pays peut être selectionné par l'utilisateur"], [737, "Champ Pays", "L'utilisateur ne peut selectionner que parmi les pays de l'UEMOA"], [738, "Champ Institution financière", "Titre du champ \"Institution financière\""], [739, "Champ Institution financière", "Si le numéro de compte est un IBAN, l'institution financière est déduit de l'IBAN et le champ n'est pas modifiable par le client"], [740, "Champ Institution financière", "Si le numéro de compte est un IBAN et que l'institution financière est désactivé, le message d'erreur correspondant doit être affiché"], [741, "Champ Institution financière", "Si le numéro de compte est un IBAN et que l'institution financière n'est pas dans la liste, le message d'erreur correspondant doit être affiché"], [742, "Champ Institution financière", "Si le numéro de compte n'est pas un IBAN, l'Institution financière peut être selectionnée par l'utilisateur"], [743, "Champ Institution financière", "La liste des institutions financières ne doit afficher que les institutions dont le statut est activé ou désactivé"], [744, "Champ Institution financière", "Une institution financière qui est desactivée doit être affichée dans la liste mais grisée avec un message en dessous de son non: \"indisponible\" ou \"en maintenance\""], [745, "Champ Institution financière", "Uniquement le nom de l'institution doit être affiché - le code membre ne doit pas l'être"], [746, "Champ Montant", "Accepte que des chiffres"], [747, "Champ Montant", "N'accepte pas les nombres décimaux"], [748, "Champ Montant", "Message d'erreur en dessous du champ si le solde est insuffisant"], [749, "Champ Note ou Motif", "Champ optionnel"], [750, "Champ Note ou Motif", "Maximum 140 caractères"], [751, "Titre de la page", "Confirmation"], [752, "Sous titre de la page", "Voulez-vous vraiment effectuer un transfert au profit de ce bénéficiaire"], [753, "Champ Numéro de compte", "Affiche le numéro de compte du bénéficiare"], [754, "Champ Pays", "Affiche le pays du bénéficiare"], [755, "Champ Institution financière", "Affiche le nom du participant bénéficiare"], [756, "Champ Nom du bénéficiaire", "Affiche le nom complet du bénéficiaire tel que retourné par la vérification de l'existence du compte"], [757, "Champ Montant", "Affiche le montant de la transaction"], [758, "Champ Frais", "Affiche gratuit si l'envoi est gratuit selon les règles de PI"], [759, "Champ Frais", "Affiche le montant des frais si l'envoi est facturé selon les règles de PI (transfert transfontalier par exemple)"], [760, "Champ Note ou Motif", "Affiche le motif renseigné par le client"], [761, "Bouton \"Annuler\"", "Permet d'annuler l'envoi et de revenir sur la Page \"Options d'envoi\""], [762, "Bouton \"Programmer\"", "Au clic - on afiiche la page Programmer"], [763, "Titre de la page", "Envoyer par IBAN ou Envoi par IBAN"], [764, "Sous titre de la page", "Numéro de compte bancaire international"], [765, "Ordre d'affichage des champs: IBAN, Pays, Banque, Montant, Note", "L'ordre doit être respecté"], [766, "Champ IBAN", "Titre du champ \"Numéro IBAN\""], [767, "Champ IBAN", "Accepte que des IBAN - format IBAN vérifié"], [768, "Champ Pays", "Le pays est déduit de l'IBAN et le champ n'est pas modifiable par le client"], [769, "Champ Banque", "La banque est déduit de l'IBAN et le champ n'est pas modifiable par le client"], [770, "Champ Montant", "Accepte que des chiffres"], [771, "Champ Montant", "N'accepte pas les nombres décimaux"], [772, "Champ Note ou Motif", "Champ optionnel"], [773, "Champ Note ou Motif", "Maximum 140 caractères"], [774, "Bouton \"Continuer\"", "Le clic sur ce bouton déclenche l'envoi de la vérification de compte et affiche la page de confirmation de l'envoi"], [775, "Champs", "Doit être identique à celle l'envoi par numéro de compte"], [776, "Titre de la page", "Ajouter un contact"], [777, "Sous titre de la page", "Enregistrer un nouveau contact avec son alias"], [778, "Ordre d'affichage des champs: Prénoms et nom, Alias", "L'ordre doit être respecté"], [779, "Champ \"Prénoms et nom\"", "Titre du champ \"Prénoms et nom\""], [780, "Champ \"Alias\"", "Accepte une adresse de paiement (format UUID v4)"], [781, "Champ \"Alias\"", "Accepte un numéro de téléphone avec l'indicatif"], [782, "Champ \"Alias\"", "Bouton coller permettant de coller un alias"], [783, "Champ \"Alias\"", "Message d'erreur en dessous si l'alias n'est pas valide"], [784, "Bouton \"Enregistrer et continuer\"", "Au clic, le PSP enregistre l'alias dans les contacts comme un nouveau contact et affiche le formulaire d'envoi à un contact en utilisant ce nouveau contact"], [785, "Nom du contact", "Affiche le nom du contact non éditable"], [786, "Alias de compte", "Affiche l'alias de compte non éditable"], [787, "Champ Montant", "Accepte que des chiffres"], [788, "Champ Montant", "N'accepte pas les nombres décimaux"], [789, "Champ Montant", "Solde affiché en dessous du champ"], [790, "Champ Montant", "Message d'erreur en dessous du champ si le solde est insuffisant"], [791, "Champ Note ou Motif", "Champ optionnel"], [792, "Champ Note ou Motif", "Maximum 140 caractères"], [793, "Bouton \"Continuer\"", "Le clic sur ce bouton affiche la page de confirmation de l'envoi"], [794, "Champ montant", "Le montant de la transaction récente est renseigné par défaut"], [795, "Champ montant", "Le montant de la transaction récente est modifiable"], [796, "Champ Note ou Motif", "Afficher le titre \"Programmer\""], [797, "Champ Note ou Motif", "Le motif est modifiable"], [798, "Champ Note ou Motif", "Le motif  optionnel"], [799, "Champ Note ou Motif", "Le motif renseigné peut être au maximum sur 104 caractères"], [800, "Titre", "Programmer"], [801, "Champ Fréquence", "L'utilisateur doit pouvoir Sélectionner les fréquences suivantes (Une seule fois, Quotidienne, Hebdomadaire, Mensuelle, Annuelle et Sur Mesure)"], [802, "Champ date", "Lorsque la fréquence est :\n   - Une seule fois : le client peut sélectionné une seule date qui sera la date d'exécution de l'abonnement\n   - différente d'une seule fois: le client peut sélectionner une plage de date (Date début, Date fin). La Date début est obligatoire et la Date fin est Optionnelle."], [803, "Bouton \"Continuer\"", "Au clic - on rècupère la position GPS de l'utilisateur - on demande la permission à l'utilisateur si pas encore accordée la première fois"], [804, "Entête", "Affichage du montant de transaction avec le signe \"-\""], [805, "Entête", "Affichage du nom du client payé"], [806, "Entête - Abonnement", "Affichage de la date du prochain paiement au format \"Prochain paiement le 7 juin, 15:17\""], [807, "Entête - Envoi programmé", "Affichage de la date exécution au format \"Programmé pour le 7 juin, 15:17\""], [808, "Entête", "Affichage de l'avatar du client payé : Si photo non disponible, Utiliser les initiales du nom"], [809, "Actions possibles", "Bouton \"Editer\", \"Désactiver\", \"Réactiver\", \"Supprimer\""], [810, "Bouton \"Editer\"", "Permet de modifier la programmation: ouvre le Formulaire de programmation"], [811, "Bouton \"Désactiver\"", "Permet de désactiver l'abonnement"], [812, "Bouton \"Réactiver\"", "Permet de réactiver l'abonnement"], [813, "Bouton \"Supprimer\"", "Permet de suprimer l'abonnement"], [814, "Détails sur la programmation", "La fréquence doit être affichée"], [815, "Détails sur la programmation", "Si la fréquence est \"Une seule fois\": La date début doit être affichée avec le libéllé \"Programmé pour\""], [816, "Détails sur la programmation", "Si la fréquence est récurrente: la date début doit être affichée avec le libéllé \"Date de début\""], [817, "Détails sur la programmation", "Si la fréquence est récurrente: La date de prochainne exécution doit être affichée avec le libéllé \"Prochain paiement\""], [818, "Détails sur la programmation", "Si la fréquence est récurrente et si la date fin est définie, elle doit être affichée avec le libéllé \"Date de fin\""], [819, "Details: Note ou Motif", "Si une note a été renseignée à l'envoi, ce détail doit être affiché"], [820, "Détails sur le bénéficiaire", "Envoyé à Nom du bénéificiaire"], [821, "Détails sur le bénéficiaire", "Pays de l'institution financière du bénéficiaire"], [822, "Détails sur le bénéficiaire", "Nom de l'institution financière du bénéficiaire"], [823, "Détails sur le bénéficiaire", "Alias du bénéficiaire avec le bouton copier si c'est un envoi par alias"], [824, "Détails sur le bénéficiaire", "Avoir un bouton permettant d'enregistrer l'alias du bénéficiare dans les contacts"], [825, "Détails sur le bénéficiaire", "Numéro de compte du bénéficiaire avec le bouton copier si c'est un envoi par numéro de compte ou IBAN"], [826, "Détails: Categorie", "Bouton permettant à l'utilisateur de classer ce transfert dans le cas où la fonctionnalité de budget et d'analytique est offert dans l'app"]];

const PISPI_CAPTURE_EXTRA_TESTS = [
  ['99a', "Revendication acceptée", "Notification de revendication acceptée après authentification, sans notice ni actions."],
  ['100a', "Renvoyer le code", "Après expiration du délai d'attente, le lien Renvoyer le code est affiché avec le clavier numérique ouvert."],
  ['100b', "Erreur OTP", "Lorsque le code OTP saisi est incorrect, un message d'erreur est affiché sous les champs avec le clavier numérique ouvert."],
];

const PISPI_EXTRA_TESTS_BY_ANCHOR = {
  99: PISPI_CAPTURE_EXTRA_TESTS.filter(test => String(test[0]).startsWith('99')),
  100: PISPI_CAPTURE_EXTRA_TESTS.filter(test => String(test[0]).startsWith('100')),
};

const PISPI_CAPTURE_SCREEN_TESTS = PISPI_CAPTURE_TESTS.flatMap(test => [
  test,
  ...(PISPI_EXTRA_TESTS_BY_ANCHOR[test[0]] || []),
]);

const PiSPITestCaptures = () => {
  const ranges = React.useMemo(() => Array.from({ length: Math.ceil(PISPI_CAPTURE_TESTS.length / 50) }, (_, i) => {
    const start = i * 50 + 1;
    const end = Math.min((i + 1) * 50, PISPI_CAPTURE_TESTS.length);
    return { start, end };
  }), []);
  const preferredRangeStart = 51;
  const rangeFromLocation = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryRange = params.get('tests');
      const hashRange = (window.location.hash || '').match(/^#tests-(\d+)-(\d+)$/);
      const rawStart = queryRange ? queryRange.split('-')[0] : hashRange?.[1];
      const requestedStart = Number(rawStart);
      const matched = ranges.find(range => range.start === requestedStart);
      if (matched) return matched.start;
    } catch (error) {}
    return ranges.some(range => range.start === preferredRangeStart) ? preferredRangeStart : ranges[0].start;
  };
  const [activeRangeStart, setActiveRangeStart] = React.useState(rangeFromLocation);
  const activeRange = ranges.find(range => range.start === activeRangeStart) || ranges[0];
  const testById = React.useMemo(() => Object.fromEntries(PISPI_CAPTURE_SCREEN_TESTS.map(test => [String(test[0]), test])), []);
  const defaultTestIds = React.useMemo(() => PISPI_CAPTURE_SCREEN_TESTS.map(test => String(test[0])), []);
  const testLayoutStorageKey = 'pispi-test-captures-layout-v1';
  const [hiddenTestIds, setHiddenTestIds] = React.useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(testLayoutStorageKey) || '{}');
      return Array.isArray(saved.hidden) ? saved.hidden.map(String).filter(id => testById[id]) : [];
    } catch (error) {
      return [];
    }
  });
  const [testOrder, setTestOrder] = React.useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(testLayoutStorageKey) || '{}');
      return Array.isArray(saved.order) ? saved.order.map(String) : [];
    } catch (error) {
      return [];
    }
  });
  const [dragTarget, setDragTarget] = React.useState(null);
  const [draggedTestId, setDraggedTestId] = React.useState(null);
  const dragTargetRef = React.useRef(null);
  const draggedTestIdRef = React.useRef(null);

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => { if (window.lucide) window.lucide.createIcons(); });
    return () => cancelAnimationFrame(raf);
  }, [activeRangeStart, hiddenTestIds, testOrder, draggedTestId]);
  React.useEffect(() => {
    try {
      window.localStorage.setItem(testLayoutStorageKey, JSON.stringify({ hidden: hiddenTestIds, order: testOrder }));
    } catch (error) {}
  }, [hiddenTestIds, testOrder]);
  React.useEffect(() => { dragTargetRef.current = dragTarget; }, [dragTarget]);
  React.useEffect(() => { draggedTestIdRef.current = draggedTestId; }, [draggedTestId]);

  const showRange = (range) => {
    setActiveRangeStart(range.start);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tests', `${range.start}-${range.end}`);
      url.hash = 'pispi-test-captures';
      window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    } catch (error) {}
  };
  const [exportState, setExportState] = React.useState({ busy: false, message: '' });
  const [architectureState, setArchitectureState] = React.useState({ loaded: false, rows: [], message: 'Chargement architecture CSV...' });
  const normalizeTestOrder = (order = []) => {
    const known = order.map(String).filter(id => testById[id]);
    const missing = defaultTestIds.filter(id => !known.includes(id));
    return [...known, ...missing];
  };
  const orderedTestIds = normalizeTestOrder(testOrder);
  const testRangeNumber = (id) => Number(String(id).match(/^\d+/)?.[0] || id);
  const activeRangeIds = orderedTestIds.filter(id => {
    const index = testRangeNumber(id);
    return index >= activeRange.start && index <= activeRange.end;
  });
  const activeRangeTotal = activeRangeIds.length;
  const hiddenTests = orderedTestIds.map(id => testById[id]).filter(test => test && hiddenTestIds.includes(String(test[0])));
  const activeTests = activeRangeIds.map(id => testById[id]).filter(test => test && !hiddenTestIds.includes(String(test[0])));
  const hideTest = (index) => {
    const id = String(index);
    setHiddenTestIds(ids => ids.includes(id) ? ids : [...ids, id]);
  };
  const restoreTest = (id) => setHiddenTestIds(ids => ids.filter(item => item !== String(id)));
  const restoreFromSelect = (event) => {
    const value = event.target.value;
    if (!value) return;
    if (value === '__all') setHiddenTestIds([]);
    else restoreTest(value);
    event.target.value = '';
  };
  const moveTest = (index, beforeIndex = null) => {
    const id = String(index);
    if (!testById[id]) return;
    setTestOrder(order => {
      const nextOrder = normalizeTestOrder(order).filter(item => item !== id);
      const beforeId = beforeIndex ? String(beforeIndex) : null;
      const beforePosition = beforeId && beforeId !== id ? nextOrder.indexOf(beforeId) : -1;
      if (beforePosition >= 0) nextOrder.splice(beforePosition, 0, id);
      else nextOrder.push(id);
      return nextOrder;
    });
  };
  React.useEffect(() => {
    if (!draggedTestId) return undefined;

    const handlePointerMove = (event) => {
      const node = document.elementFromPoint(event.clientX, event.clientY);
      const card = node?.closest?.('.cap-card[data-test-index]');
      if (card) {
        setDragTarget({ beforeId: card.dataset.testIndex });
        return;
      }

      const grid = node?.closest?.('.cap-grid[data-test-range]');
      if (grid) setDragTarget({ beforeId: null });
    };
    const handlePointerUp = () => {
      const target = dragTargetRef.current;
      const testId = draggedTestIdRef.current;
      if (testId && target && String(testId) !== String(target.beforeId)) moveTest(testId, target.beforeId);
      setDraggedTestId(null);
      setDragTarget(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [draggedTestId]);
  const handlePointerDragStart = (event, index) => {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    setDraggedTestId(String(index));
    setDragTarget({ beforeId: String(index) });
  };
  const handleDragStart = (event, index) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(index));
    setDraggedTestId(String(index));
  };
  const handleDragOver = (event, beforeIndex = null) => {
    if (!draggedTestId) return;
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
    setDragTarget({ beforeId: beforeIndex ? String(beforeIndex) : null });
  };
  const handleDrop = (event, beforeIndex = null) => {
    event.preventDefault();
    event.stopPropagation();
    const testId = event.dataTransfer.getData('text/plain') || draggedTestId;
    if (testId && String(testId) !== String(beforeIndex)) moveTest(testId, beforeIndex);
    setDraggedTestId(null);
    setDragTarget(null);
  };
  const handleDragEnd = () => {
    setDraggedTestId(null);
    setDragTarget(null);
  };
  const resetTestOrder = () => {
    setTestOrder([]);
    try {
      const saved = JSON.parse(window.localStorage.getItem(testLayoutStorageKey) || '{}');
      window.localStorage.setItem(testLayoutStorageKey, JSON.stringify({ ...saved, order: [] }));
    } catch (error) {}
  };
  const hasCustomOrder = testOrder.length > 0;

  const pad = (value) => {
    const text = String(value);
    const match = text.match(/^(\d+)([a-z]*)$/i);
    return match ? `${match[1].padStart(3, '0')}${match[2] || ''}` : text.padStart(3, '0');
  };
  const norm = (value) => (value || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, "'");
  const quoted = (value) => {
    const found = [];
    const re = /"([^"]+)"/g;
    let match;
    while ((match = re.exec(value || ''))) found.push(match[1]);
    return found;
  };
  const short = (value, max = 150) => {
    const text = (value || '').replace(/\s+/g, ' ').trim();
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
  };
  const has = (low, terms) => terms.some(term => low.includes(term));
  const slugify = (value) => (value || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' et ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'test';
  const parseCsvRows = (text) => {
    const table = [];
    let row = [];
    let field = '';
    let inQuotes = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const next = text[index + 1];

      if (inQuotes) {
        if (char === '"' && next === '"') {
          field += '"';
          index += 1;
        } else if (char === '"') {
          inQuotes = false;
        } else {
          field += char;
        }
        continue;
      }

      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(field);
        field = '';
      } else if (char === '\n') {
        row.push(field);
        table.push(row);
        row = [];
        field = '';
      } else if (char !== '\r') {
        field += char;
      }
    }

    if (field || row.length) {
      row.push(field);
      table.push(row);
    }

    const [headers = [], ...rows] = table;
    return rows
      .filter(values => values.some(Boolean))
      .map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] || ''])));
  };
  React.useEffect(() => {
    let cancelled = false;

    fetch('http://127.0.0.1:4789/architecture.csv', { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then(text => {
        if (cancelled) return;
        const rows = parseCsvRows(text).filter(row => row.step_id && row.suggested_file_name);
        setArchitectureState({ loaded: true, rows, message: `${rows.length} noms chargés depuis architecture.csv` });
      })
      .catch(() => {
        if (!cancelled) setArchitectureState({ loaded: false, rows: [], message: 'architecture.csv non chargé, fallback local actif' });
      });

    return () => { cancelled = true; };
  }, []);
  const architectureByIndex = React.useMemo(() => {
    return Object.fromEntries(architectureState.rows.map((row, index) => [String(index + 1), row]));
  }, [architectureState.rows]);
  const testByIndex = (index) => PISPI_CAPTURE_SCREEN_TESTS.find(test => String(test[0]) === String(index));
  const filenameForTest = (index) => {
    const id = String(index);
    if (/^\d+$/.test(id)) {
      const architecture = architectureByIndex[String(Number(id))];
      if (architecture?.suggested_file_name) return architecture.suggested_file_name;
    }

    const test = testByIndex(index);
    return `${pad(index)}-${slugify(test?.[1])}.png`;
  };
  const nextFrame = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const blobToDataUrl = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  const triggerDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
  const writeFile = async (directoryHandle, filename, blob) => {
    const fileHandle = await directoryHandle.getFileHandle(filename, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();
  };
  const cssTextForCapture = () => {
    const chunks = [];
    [...document.styleSheets].forEach(sheet => {
      try {
        [...sheet.cssRules].forEach(rule => chunks.push(rule.cssText));
      } catch (error) {}
    });
    chunks.push(`
      .cap-export-shot { box-sizing:border-box; width:100%; height:100%; padding:18px; background:#F7F7F3; display:flex; align-items:center; justify-content:center; }
      .cap-export-shot .phone { transform:none !important; position:relative !important; inset:auto !important; margin:0 !important; box-shadow:0 18px 38px rgba(14,17,16,.16), 0 3px 8px rgba(14,17,16,.08) !important; }
      .cap-export-shot * { letter-spacing:0 !important; }
    `);
    return chunks.join('\n');
  };
  const inlineCaptureImages = async (root) => {
    const images = [...root.querySelectorAll('img')];
    await Promise.all(images.map(async img => {
      const src = img.currentSrc || img.getAttribute('src');
      if (!src || src.startsWith('data:')) return;
      try {
        const response = await fetch(new URL(src, window.location.href).href);
        const blob = await response.blob();
        img.setAttribute('src', await blobToDataUrl(blob));
      } catch (error) {}
    }));
  };
  const html2CanvasPhoneBlob = async (phone) => {
    if (!window.html2canvas) return null;

    const margin = 18;
    const width = Math.ceil(phone.offsetWidth || 402) + margin * 2;
    const height = Math.ceil(phone.offsetHeight || 856) + margin * 2;
    const clone = phone.cloneNode(true);
    clone.style.transform = 'none';
    clone.style.position = 'relative';
    clone.style.inset = 'auto';
    clone.style.margin = '0';
    clone.style.fontFamily = "var(--font-sans), 'Open Sans', system-ui, sans-serif";

    const shell = document.createElement('div');
    shell.className = 'cap-export-shot';
    shell.style.cssText = [
      `position:fixed`,
      `left:-12000px`,
      `top:0`,
      `width:${width}px`,
      `height:${height}px`,
      `padding:${margin}px`,
      `box-sizing:border-box`,
      `background:#F7F7F3`,
      `display:flex`,
      `align-items:center`,
      `justify-content:center`,
      `font-family:var(--font-sans),'Open Sans',system-ui,sans-serif`,
      `letter-spacing:0`,
      `z-index:-1`,
    ].join(';');
    shell.appendChild(clone);
    document.body.appendChild(shell);

    try {
      if (document.fonts?.ready) await document.fonts.ready;
      await inlineCaptureImages(shell);
      await nextFrame();
      const canvas = await window.html2canvas(shell, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        windowWidth: width,
        windowHeight: height,
      });
      return await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    } finally {
      shell.remove();
    }
  };
  const phoneToPngBlob = async (phone) => {
    if (window.lucide) window.lucide.createIcons();
    if (document.fonts?.ready) await document.fonts.ready;
    await nextFrame();
    const canvasBlob = await html2CanvasPhoneBlob(phone);
    if (canvasBlob) return canvasBlob;

    const margin = 18;
    const width = Math.ceil(phone.offsetWidth || 402) + margin * 2;
    const height = Math.ceil(phone.offsetHeight || 856) + margin * 2;
    const clone = phone.cloneNode(true);
    clone.style.transform = 'none';
    clone.style.position = 'relative';
    clone.style.inset = 'auto';
    clone.style.margin = '0';

    const shell = document.createElement('div');
    shell.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    shell.className = 'cap-export-shot';
    shell.style.width = `${width}px`;
    shell.style.height = `${height}px`;

    const style = document.createElement('style');
    style.textContent = cssTextForCapture();
    shell.appendChild(style);
    shell.appendChild(clone);
    await inlineCaptureImages(shell);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><foreignObject width="100%" height="100%">${new XMLSerializer().serializeToString(shell)}</foreignObject></svg>`;
    const image = new Image();
    const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    const scale = 2;
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = svgUrl;
    });

    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.drawImage(image, 0, 0, width, height);
    return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  };
  const exportCardPng = async (index, directoryHandle = null) => {
    const card = document.querySelector(`.cap-card[data-test-index="${index}"]`);
    const phone = card?.querySelector('.cap-phone');
    if (!phone) throw new Error(`Screen ${pad(index)} is not currently rendered.`);
    const blob = await phoneToPngBlob(phone);
    const filename = filenameForTest(index);
    if (directoryHandle) await writeFile(directoryHandle, filename, blob);
    else triggerDownload(blob, filename);
  };
  const downloadOne = async (index) => {
    if (exportState.busy) return;
    const filename = filenameForTest(index);
    setExportState({ busy: true, message: `Préparation ${filename}...` });
    try {
      await exportCardPng(index);
      setExportState({ busy: false, message: `${filename} téléchargé.` });
    } catch (error) {
      setExportState({ busy: false, message: `Export impossible pour ${filename}.` });
    }
  };
  const exportActiveRange = async () => {
    if (exportState.busy) return;
    const tests = activeTests;
    if (!tests.length) {
      setExportState({ busy: false, message: 'Aucun écran visible à exporter dans cette vague.' });
      return;
    }
    let directoryHandle = null;
    setExportState({ busy: true, message: 'Choisissez un dossier pour sauvegarder les PNG...' });
    try {
      if (window.showDirectoryPicker) {
        directoryHandle = await window.showDirectoryPicker({ mode: 'readwrite', id: 'pispi-test-captures' });
      }
      for (const [position, test] of tests.entries()) {
        setExportState({ busy: true, message: `Export ${filenameForTest(test[0])} (${position + 1}/${tests.length})...` });
        await exportCardPng(test[0], directoryHandle);
      }
      setExportState({ busy: false, message: directoryHandle ? `${tests.length} PNG sauvegardés dans le dossier choisi.` : `${tests.length} téléchargements lancés.` });
    } catch (error) {
      const cancelled = error && error.name === 'AbortError';
      setExportState({ busy: false, message: cancelled ? 'Export annulé.' : 'Export interrompu.' });
    }
  };
  const waitForRenderedTests = (testIds, timeoutMs = 9000) => new Promise((resolve, reject) => {
    const startedAt = Date.now();
    const selectorFor = (id) => `.cap-card[data-test-index="${String(id).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"] .cap-phone`;
    const tick = () => {
      const ready = testIds.every(id => document.querySelector(selectorFor(id)));
      if (ready) {
        resolve();
        return;
      }
      if (Date.now() - startedAt > timeoutMs) {
        reject(new Error('Range render timeout'));
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  const updateRangeUrl = (range) => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tests', `${range.start}-${range.end}`);
      url.hash = 'pispi-test-captures';
      window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    } catch (error) {}
  };
  const exportAllScreens = async () => {
    if (exportState.busy) return;
    const originalRangeStart = activeRangeStart;
    const originalRange = activeRange;
    const originalHiddenTestIds = hiddenTestIds;
    const allIds = orderedTestIds.filter(id => testById[id]);
    if (!allIds.length) {
      setExportState({ busy: false, message: 'Aucun écran à exporter.' });
      return;
    }

    let directoryHandle = null;
    setExportState({ busy: true, message: 'Choisissez un dossier pour exporter tous les PNG...' });
    try {
      if (window.showDirectoryPicker) {
        directoryHandle = await window.showDirectoryPicker({ mode: 'readwrite', id: 'pispi-test-captures-all' });
      }

      setHiddenTestIds([]);
      let exported = 0;
      for (const range of ranges) {
        const rangeIds = allIds.filter(id => {
          const index = testRangeNumber(id);
          return index >= range.start && index <= range.end;
        });
        if (!rangeIds.length) continue;

        setActiveRangeStart(range.start);
        updateRangeUrl(range);
        setExportState({ busy: true, message: `Préparation de la vague #${pad(range.start)}–#${pad(range.end)}...` });
        await waitForRenderedTests(rangeIds);
        await nextFrame();

        for (const id of rangeIds) {
          const filename = filenameForTest(id);
          exported += 1;
          setExportState({ busy: true, message: `Export ${filename} (${exported}/${allIds.length})...` });
          await exportCardPng(id, directoryHandle);
          await nextFrame();
        }
      }

      setExportState({
        busy: false,
        message: directoryHandle ? `${exported} PNG sauvegardés dans le dossier choisi.` : `${exported} téléchargements lancés.`,
      });
    } catch (error) {
      const cancelled = error && error.name === 'AbortError';
      setExportState({ busy: false, message: cancelled ? 'Export global annulé.' : 'Export global interrompu.' });
    } finally {
      setHiddenTestIds(originalHiddenTestIds);
      setActiveRangeStart(originalRangeStart);
      updateRangeUrl(originalRange);
    }
  };

  const HOME_TXS = [
    { name: 'Mamadou Diallo', meta: 'Transfert envoyé · 7 juin, 11:56', amount: '-48.200 CFA', tone: 'out' },
    { name: 'Awa Traoré', meta: 'Paiement reçu · 7 juin, 10:24', amount: '12.500 CFA', tone: 'in' },
    { name: 'NIGELEC · Facture', meta: 'Facture payée · 6 juin, 18:14', amount: '-18.450 CFA', tone: 'out' },
    { name: 'Amina Oumarou', meta: 'Demande de paiement · 6 juin, 16:42', amount: '25.000 CFA', tone: 'in' },
    { name: 'Ali Issoufou', meta: 'Transfert envoyé · 5 juin, 12:05', amount: '-35.000 CFA', tone: 'out' },
    { name: 'Hadiza Abdou', meta: 'Paiement reçu · 4 juin, 19:18', amount: '7.500 CFA', tone: 'in' },
  ];

  const IconButton = ({ icon, label, active }) => (
    <button className={`cap-icon-button ${active ? 'active' : ''}`}><M_Icon name={icon} /><span>{label}</span></button>
  );
  const Field = ({ label, value, icon = 'text-cursor-input', badge }) => (
    <div className="cap-field">
      <span className="cap-field-icon"><M_Icon name={icon} /></span>
      <div><small>{label}</small><strong>{value}</strong></div>
      {badge && <em>{badge}</em>}
    </div>
  );
  const OptionRow = ({ icon, title, text, badge }) => (
    <div className="cap-option-row">
      <span className="cap-option-icon"><M_Icon name={icon} /></span>
      <div><strong>{title}</strong><small>{text}</small></div>
      {badge ? <em>{badge}</em> : <M_Icon name="chevron-right" />}
    </div>
  );
  const TxRow = ({ name = 'Mamadou Diallo', meta = 'Transfert envoyé · 7 juin, 11:56', amount = '-48.200 CFA', tone = 'out' }) => {
    const incoming = tone === 'in' || (!amount.trim().startsWith('-') && amount !== 'PI' && amount !== 'Sélectionné' && amount !== 'Alias requis');
    const initials = name.split(' ').map(x => x[0]).slice(0, 2).join('').replace('·', '') || 'PI';
    return <div className={`cap-tx-row ${incoming ? 'incoming' : 'outgoing'}`}>
      <span className="cap-tx-avatar-wrap">
        <span className="cap-avatar">{initials}</span>
        <span className={`cap-tx-direction ${incoming ? 'incoming' : 'outgoing'}`}>
          <M_Icon name={incoming ? 'arrow-down-left' : 'arrow-up-right'} />
        </span>
      </span>
      <div><strong>{name}</strong><small>{meta}</small></div>
      <b className={tone}>{amount}</b>
    </div>;
  };
  const MiniQr = () => (
    <div className="cap-qr" aria-label="QR Code PI">
      {Array.from({ length: 49 }).map((_, i) => <span key={i} className={(i % 3 === 0 || i % 7 === 0 || [1,5,8,12,18,24,30,36,40,44].includes(i)) ? 'on' : ''} />)}
      <img src="assets/logo-spi-dark.png" alt="PI-SPI" />
    </div>
  );

  const classify = (title, description) => {
    const low = norm(`${title} ${description}`);
    if (has(low, ['positionnement du bouton', 'image / icone du bouton', 'titre / texte du bouton', 'action du bouton'])) return 'entry';
    if (has(low, ["choix du compte", "creer votre alias", "creation d'alias", "adresse de paiement", "numero de telephone non disponible", "numero de telephone en cours", "compte a deja un alias", "revendiquer l'alias", "choisir un autre alias", "alias existe deja"])) return 'alias';
    if (has(low, ['indicatif pays', 'champ numero de telephone'])) return 'phone';
    if (has(low, ['otp', 'code otp', 'saisi du code', 'saisie du code', 'renvoyer', 'temps restant'])) return 'otp';
    if (has(low, ['page par defaut', 'mon code', 'flux camera', 'lampe torche', "importation d'image", 'importation d image'])) return 'qr';
    if (has(low, ['logo pi-spi', 'onglet compte', 'solde', 'bouton qr code', 'bouton mon alias', 'boutons envoyer', 'section transactions', 'choix du numero de compte'])) return 'home';
    if (has(low, ['notifications', 'notification', 'revendication', 'demande de paiement recue', 'demande de paiement envoyee'])) return 'notification';
    if (has(low, ["profil", "avatar de l'utilisateur", "options obligatoires", "details du compte", "supprimer mon alias", 'menu "compte"', "centre d'aide"])) return 'profile';
    if (has(low, ["nouveau contact", "liste des contacts", "selection d'un contact", "rechercher un contact", "formulaire de creation d'un nouveau contact", "contacts"])) return 'contacts';
    if (has(low, ["qr code", "scanner", "flux camera", "lampe torche", "importation d'image", "mon code"])) return 'qr';
    if (has(low, ['options', 'par alias', 'par numero de compte', 'par iban', 'transactions recentes'])) return 'send-options';
    if (has(low, ["envoyer par alias", "envoi par alias", "envoyer par numero", "envoi par numero", "envoyer par iban", "champ alias", "champ montant", "champ note", "champ pays", "champ institution", "champ iban", 'champ "numero de compte"', "ordre d'affichage des champs"])) return 'form';
    if (has(low, ['confirmation', 'voulez-vous vraiment', 'champ frais', 'champ nom du beneficiaire', 'bouton "confirmer"'])) return 'confirmation';
    if (has(low, ['detail transaction', 'details sur les references', 'details sur le beneficiaire', 'recu de la transaction', 'actions possibles', 'entete - abonnement', 'entete - envoi programme'])) return 'detail';
    if (has(low, ["annulation", "refuser", "accepter", "rejeter", "motifs de rejet", "dialogue d'acceptation"])) return 'decision';
    if (has(low, ['partage de paiement', 'partager avec', 'paiement partage'])) return 'share';
    if (has(low, ['demande de paiement', 'pico', 'picash', 'payer', 'debit differe', 'facture', 'site e-commerce'])) return 'request';
    if (has(low, ['rechercher une transaction', 'liste des transactions', 'filtrer', 'plage de dates', 'appliquer'])) return 'history';
    if (has(low, ['abonnement', 'programme', 'programmer', 'frequence', 'transactions a venir', 'paiements programmes'])) return 'subscription';
    if (has(low, ['entete', 'détails:', 'details:', 'details sur', 'détails sur', 'reference', 'référence', 'identifiant', 'categorie', 'catégorie'])) return 'detail';
    return 'generic';
  };

  const makeSpec = (test) => {
    const [index, title, description] = test;
    const indexKey = String(index);
    const numericIndex = Number(indexKey);
    const low = norm(`${title} ${description}`);
    const q = quoted(description);
    let kind = classify(title, description);
    if (indexKey === '99a') kind = 'notification';
    if (indexKey === '100a' || indexKey === '100b') kind = 'otp';
    if (numericIndex === 56) kind = 'send-options';
    if (numericIndex === 59) kind = 'request-options';
    if (numericIndex === 63) kind = 'history';
    if (numericIndex >= 51 && numericIndex <= 68 && ![56, 59, 63].includes(numericIndex)) kind = 'home';
    const firstQuote = q[0];
    const pageTitle = firstQuote && firstQuote.length <= 58 ? firstQuote : title;
    const exactLabels = q.slice(0, 4);
    const common = { index, title, description, low, q, kind, pageTitle, exactLabels };
    return common;
  };

  const screenMeta = (spec) => {
    const low = spec.low;
    const homeMetaByIndex = {
      51: ['Mon alias', 'Alias accessible depuis l’accueil'],
      52: ['Partager alias', 'Partage direct de l’adresse PI'],
      53: ['Actions rapides', 'Envoyer, Recevoir et Plus alignés'],
      54: ['Envoyer', 'Libellé du bouton conforme'],
      55: ['Envoyer', 'Icône de transfert sortant conforme'],
      56: ['Envoyer', 'Options d’envoi par alias ou compte'],
      57: ['Recevoir', 'Libellé du bouton conforme'],
      58: ['Recevoir', 'Icône de demande entrante conforme'],
      59: ['Demande de paiement', 'Options de réception et contacts'],
      60: ['Plus', 'Libellé du troisième raccourci'],
      61: ['Plus', 'Icône d’actions complémentaires'],
      62: ['Transactions', 'Les 3 dernières opérations'],
      63: ['Historique', 'Liste complète et recherche'],
      64: ['Transaction', 'Nom du client affiché'],
      65: ['Transaction', 'Avatar ou initiales visibles'],
      66: ['Transaction', 'Sens et montant lisibles'],
      67: ['Transaction', 'Date au format requis'],
      68: ['Choix de compte', 'Données synchronisées par compte'],
    };
    if (homeMetaByIndex[spec.index]) {
      const [title, subtitle] = homeMetaByIndex[spec.index];
      return { title, subtitle };
    }
    const metaByKind = {
      entry: ['Accueil', 'Solde et services disponibles'],
      alias: ['Alias PI', 'Choix de l’adresse de paiement'],
      phone: ['Numéro de téléphone', 'Vérification du contact'],
      otp: ['Vérification', 'Code reçu par SMS'],
      home: ['Compte PI SPI', 'Solde, alias et transactions'],
      notification: ['Notifications', 'Alertes et demandes reçues'],
      profile: ['Profil', 'Compte et paramètres SPI'],
      contacts: ['Contacts et Alias', 'Carnet de contacts PI'],
      qr: ['Mon QR Code', 'Identité de paiement vérifiée'],
      'send-options': ['Envoyer', 'Choix du mode de transfert'],
      'request-options': ['Demande de paiement', 'Choix du mode de demande'],
      form: low.includes('demande de paiement') ? ['Demande de paiement', 'Saisie de la demande'] : ['Nouveau transfert', 'Saisie du bénéficiaire'],
      confirmation: ['Vérification', 'Récapitulatif avant validation'],
      detail: ['Détail transaction', 'Référence, statut et actions'],
      decision: ['Confirmation', 'Décision sécurisée'],
      share: ['Paiement partagé', 'Répartition entre contacts'],
      request: ['Demande reçue', 'Paiement à traiter'],
      history: ['Historique', 'Recherche et filtres'],
      subscription: ['Programmation', 'Abonnements et paiements à venir'],
      generic: ['Espace PI SPI', 'Parcours de paiement instantané'],
    };
    const [title, subtitle] = metaByKind[spec.kind] || metaByKind.generic;
    return { title, subtitle };
  };

  const EntryVisual = ({ spec }) => (
    <>
      <div className="cap-balance-hero">
        <div><small>Solde disponible · Moustapha K.</small><strong>284.910 CFA</strong><em>+12.420 CFA aujourd'hui</em></div>
      </div>
      <div className="cap-service-card featured">
        <img src="assets/logo-spi-dark.png" alt="PI-SPI" />
        <div><strong>PI SPI</strong><small>Compte personnel SPI</small></div>
        <button>Ouvrir</button>
      </div>
      <div className="cap-flow"><span>Service disponible</span><M_Icon name="arrow-right" /><strong>Accueil PI-SPI</strong></div>
    </>
  );

  const AliasVisual = ({ spec }) => (
    <>
      <section className="cap-title-card"><span>@PI</span><h3>Créer votre alias de compte</h3><p>Choisissez le type d'alias conforme PI-RAC.</p></section>
      <OptionRow icon="badge-check" title="Choisir l'adresse de paiement" text="Adresse de paiement SPI créée automatiquement" />
      <OptionRow icon="smartphone" title="Choisir le numéro de téléphone" text="Numéro vérifié par code OTP" />
      <div className="cap-inline-actions"><button>Revendiquer l'alias</button><button>Choisir un autre alias</button></div>
    </>
  );

  const PhoneVisual = ({ spec }) => (
    <>
      <Field icon="flag" label="Indicatif pays" value="+227 Niger · UEMOA" badge="modifiable" />
      <Field icon="smartphone" label="Numéro de téléphone" value="77 540 19 32" badge="numérique" />
      <div className="cap-keypad">{['1','2','3','4','5','6','7','8','9','0'].map(k => <span key={k}>{k}</span>)}</div>
      <button className="cap-primary">Continuer</button>
    </>
  );

  const OtpVisual = ({ spec }) => (
    <>
      <section className="cap-title-card"><span>OTP</span><h3>Code de vérification</h3><p>Code envoyé au numéro sélectionné.</p></section>
      <div className="cap-otp">{['4','2','8','7','1','6'].map((d, i) => <span key={i}>{d}</span>)}</div>
      {spec.low.includes('expire') || spec.low.includes('incorrect')
        ? <p className="cap-error">Code incorrect ou expiré</p>
        : spec.low.includes('renvoyer')
          ? <button className="cap-secondary">Renvoyer</button>
          : <div className="cap-timer"><M_Icon name="clock-3" /> Renvoi possible dans 00:37</div>}
    </>
  );

  const HomeVisual = ({ spec }) => {
    const actionActive = {
      54: 'send',
      55: 'send',
      57: 'receive',
      58: 'receive',
      60: 'more',
      61: 'more',
    }[spec.index];
    const actionNote = {
      53: 'Les trois raccourcis restent alignés sur une seule ligne.',
      54: 'Le libellé visible est exactement “Envoyer”.',
      55: 'L’icône indique clairement un transfert sortant.',
      57: 'Le libellé visible est exactement “Recevoir”.',
      58: 'L’icône indique clairement une réception ou une demande.',
      60: 'Le troisième raccourci garde un libellé court et compréhensible.',
      61: 'L’icône “plus” signale les actions complémentaires.',
    }[spec.index];
    const HomeHeader = () => (
      <>
        <div className="cap-home-head">
          <button className="cap-avatar-btn">MK</button>
          <img src="assets/logo-spi-dark.png" alt="SPI BCEAO" />
          <div><button><M_Icon name="search" /></button><button><M_Icon name="bell" /></button></div>
        </div>
        <div className="cap-tabs"><span className="active">Compte</span><span>Abonnements</span><span>Économie</span></div>
      </>
    );

    if (spec.index === 68) {
      return <>
        <HomeHeader />
        <section className="cap-account-card selected">
          <div><strong>Compte courant PI</strong><small>Compte principal · Moustapha K.</small></div>
          <span>284.910 CFA</span>
          <M_Icon name="chevron-down" />
        </section>
        <section className="cap-account-sheet">
          <h3>Choisir un compte</h3>
          <div className="cap-account-row active"><span>PI</span><div><strong>Compte courant PI</strong><small>Alias moustapha.k@pi</small></div><b>284.910 CFA</b></div>
          <div className="cap-account-row"><span>EP</span><div><strong>Épargne projet</strong><small>Données actualisées après sélection</small></div><b>78.400 CFA</b></div>
          <div className="cap-account-row"><span>PR</span><div><strong>Compte professionnel</strong><small>Transactions et solde dédiés</small></div><b>1.204.500 CFA</b></div>
        </section>
      </>;
    }

    if (spec.index >= 62 && spec.index <= 67) {
      return <>
        <HomeHeader />
        <section className="cap-balance-card"><small>Solde SPI disponible</small><strong>284.910 CFA</strong><button><M_Icon name="eye-off" /></button></section>
        <div className="cap-section-line"><strong>Dernières transactions</strong><span>3 affichées</span></div>
        {HOME_TXS.slice(0, 3).map(tx => <TxRow key={tx.name} {...tx} />)}
        <button className="cap-show-all">Tout afficher</button>
      </>;
    }

    if (spec.index === 51 || spec.index === 52) {
      return <>
        <HomeHeader />
        <section className="cap-balance-card"><small>Solde SPI disponible</small><strong>284.910 CFA</strong><button><M_Icon name="eye-off" /></button></section>
        <section className="cap-alias-card">
          <div className="cap-alias-main">
            <span className="cap-pi-mark">π</span>
            <div><small>Mon alias</small><strong>moustapha.k@pi</strong><em>Alias PI vérifié</em></div>
          </div>
          <div className="cap-alias-actions">
            <button className={spec.index === 51 ? 'active' : ''}><M_Icon name="at-sign" /> Mon alias</button>
            <button className={spec.index === 52 ? 'active' : ''}><M_Icon name="share-2" /> Partager</button>
          </div>
        </section>
        <div className="cap-actions-three"><IconButton icon="arrow-up-right" label="Envoyer" /><IconButton icon="arrow-down-left" label="Recevoir" /><IconButton icon="more-horizontal" label="Plus" /></div>
      </>;
    }

    return <>
      <div className="cap-home-head">
        <button className="cap-avatar-btn">MK</button>
        <img src="assets/logo-spi-dark.png" alt="SPI BCEAO" />
        <div><button><M_Icon name="search" /></button><button><M_Icon name="bell" /></button></div>
      </div>
      <div className="cap-tabs"><span className="active">Compte</span><span>Abonnements</span><span>Économie</span></div>
      <section className="cap-balance-card"><small>Solde SPI disponible</small><strong>284.910 CFA</strong><button><M_Icon name="eye-off" /></button></section>
      <div className="cap-actions-three">
        <IconButton icon="arrow-up-right" label="Envoyer" active={actionActive === 'send'} />
        <IconButton icon="arrow-down-left" label="Recevoir" active={actionActive === 'receive'} />
        <IconButton icon="more-horizontal" label="Plus" active={actionActive === 'more'} />
      </div>
      {actionNote && <div className="cap-action-note"><M_Icon name="badge-check" /> {actionNote}</div>}
      <div className="cap-section-line"><strong>Dernières transactions</strong><span>3 affichées</span></div>
      {HOME_TXS.slice(0, 2).map(tx => <TxRow key={tx.name} {...tx} />)}
    </>;
  };

  const RequestOptionsVisual = ({ spec }) => (
    <>
      <div className="cap-search"><M_Icon name="search" /><span>Rechercher un contact</span><button><M_Icon name="scan-line" /></button></div>
      <h3 className="cap-section-title">Demande de paiement</h3>
      <OptionRow icon="at-sign" title="Par alias" text="Adresse de paiement du destinataire" />
      <OptionRow icon="user-plus" title="Nouveau contact" text="Ajouter un contact avec son alias" />
      <h3 className="cap-section-title">Transactions récentes</h3>
      <TxRow name="Mamadou Diallo" meta="Demande envoyée · 7 juin, 11:56" amount="-10.000 CFA" tone="out" />
      <h3 className="cap-section-title">Contacts</h3>
      <TxRow name="Amina Oumarou" meta="90 24 76 36" amount="PI" tone="neutral" />
      <TxRow name="Ali Issoufou" meta="+227 96 74 98 31" amount="PI" tone="neutral" />
    </>
  );

  const NotificationVisual = ({ spec }) => (
    <>
      <div className="cap-filter-pills"><span className="active">Non lues</span><span>Tous</span><span>Demande de paiement</span><span>Transfert</span><span>Annulation</span><span>Revendication d'alias</span></div>
      <OptionRow icon="badge-alert" title="Revendication d'alias" text="Vous avez reçu une revendication sur votre alias +227 XXXXXXX" badge="Important" />
      <OptionRow icon="arrow-down-left" title="Demande de paiement" text="Demandée par Mamadou Diallo · 12.500 CFA" badge="À traiter" />
      <OptionRow icon="check-circle-2" title="Transfert exécuté" text="PI-2406-7721 est réglé" badge="Succès" />
      <Field icon="calendar" label="Date de la demande" value="7 juin, 15:17" />
    </>
  );

  const ProfileVisual = ({ spec }) => (
    <>
      <section className="cap-profile-head"><span className="cap-avatar large">MK</span><div><h3>Moustapha Kodjo</h3><p>moustapha.k@pi</p></div><button><M_Icon name="copy" /></button></section>
      <OptionRow icon="circle-user" title="Compte" text="Client particulier · numéro de compte · copier" />
      <OptionRow icon="contact-round" title="Contacts et Alias" text="Alias adresse de paiement et numéro de téléphone" />
      <OptionRow icon="help-circle" title="Centre d'aide" text="Support et assistance SPI" />
      <button className="cap-danger">Supprimer mon alias</button>
    </>
  );

  const ContactsVisual = ({ spec }) => (
    <>
      <div className="cap-search"><M_Icon name="search" /><span>Rechercher un contact</span><button><M_Icon name="qr-code" /></button></div>
      <OptionRow icon="user-plus" title="Nouveau Contact" text="Ajouter un contact avec son alias" />
      <Field icon="user-round" label="Prénoms et nom" value="Awa Traoré" />
      <Field icon="at-sign" label="Alias" value="awa.tr@pi" badge="Coller" />
      <button className="cap-primary">Enregistrer et Continuer</button>
      <TxRow name="Mamadou Diallo" meta="mamadou.d@pi" amount="PI" tone="in" />
    </>
  );

  const QrVisual = ({ spec }) => (
    <>
      <MiniQr />
      <h3 className="cap-center-title">Moustapha K.</h3>
      <p className="cap-center-sub">moustapha.k@pi · Compte SPI vérifié</p>
      <div className="cap-actions-two"><button>Partager alias</button><button>Partager QR Code</button></div>
      <div className="cap-scan-frame"><M_Icon name="scan-line" /><span>Flux caméra activé</span><button>Lampe torche</button><button>Galerie</button></div>
      <div className="cap-switch"><span className="active">Scanner</span><span>Mon Code</span></div>
    </>
  );

  const SendOptionsVisual = ({ spec }) => (
    <>
      <div className="cap-search"><M_Icon name="search" /><span>Nom, alias PI ou téléphone</span><button><M_Icon name="scan-line" /></button></div>
      <h3 className="cap-section-title">Envoyer</h3>
      <OptionRow icon="at-sign" title="Par Alias" text="Adresse de paiement ou n° de téléphone" />
      <OptionRow icon="landmark" title="Par numéro de compte" text="RIB, IBAN, n° de téléphone ou autre" />
      <OptionRow icon="user-plus" title="Nouveau contact" text="Ajouter un contact avec son alias" />
      <h3 className="cap-section-title">Transactions récentes</h3>
      <TxRow /><TxRow name="Awa Traoré" amount="+12.500 CFA" tone="in" />
    </>
  );

  const FormVisual = ({ spec }) => {
    const low = spec.low;
    const isIban = low.includes('iban');
    const isAccount = low.includes('numero de compte') || low.includes('rib');
    const title = isIban ? 'Envoyer par IBAN' : isAccount ? 'Envoyer par numéro de compte' : low.includes('demande de paiement') ? 'Demande de paiement' : 'Envoyer par Alias';
    return <>
      <section className="cap-title-card"><span>Saisie</span><h3>{title}</h3><p>{isIban ? 'Numéro de compte bancaire international' : isAccount ? 'RIB, IBAN, n° de téléphone ou autre identifiant' : 'Coller ou saisir l’alias'}</p></section>
      {isIban ? <Field icon="landmark" label="Numéro IBAN" value="SN08 0100 1234 5678 9012" badge="vérifié" /> : isAccount ? <Field icon="wallet-cards" label="Numéro de compte" value="SN-PI-000458209" badge="Coller" /> : <Field icon="at-sign" label="Alias" value="mamadou.d@pi" badge="Coller" />}
      <Field icon="flag" label="Pays du bénéficiaire" value="Sénégal · UEMOA" />
      <Field icon="building-2" label="Institution financière" value="Banque Exemple" badge="activée" />
      <Field icon="coins" label="Montant" value="48.200 CFA" badge="numérique" />
      <Field icon="message-square-text" label="Note ou Motif" value="Règlement facture" badge="140 max" />
      <p className="cap-error">Format invalide ou solde insuffisant</p>
      <button className="cap-primary">Continuer</button>
    </>;
  };

  const ConfirmationVisual = ({ spec }) => (
    <>
      <section className="cap-title-card"><span>Confirmation</span><h3>Confirmation</h3><p>Voulez-vous vraiment effectuer un transfert au profit de ce bénéficiaire ?</p></section>
      <Field icon="at-sign" label="Alias / Numéro de compte" value="mamadou.d@pi" />
      <Field icon="flag" label="Pays" value="Sénégal" />
      <Field icon="building-2" label="Institution financière" value="Banque Exemple" />
      <Field icon="user-round" label="Nom du bénéficiaire" value="Mamadou Diallo" />
      <Field icon="coins" label="Montant" value="48.200 CFA" />
      <Field icon="receipt" label="Frais" value="Gratuit" />
      <div className="cap-inline-actions"><button>Annuler</button><button>Programmer</button><button>Confirmer</button></div>
      <div className="cap-auth"><M_Icon name="fingerprint" /> Double authentification puis loader et résultat</div>
    </>
  );

  const DetailVisual = ({ spec }) => {
    const incoming = spec.low.includes('signe "+"') || spec.low.includes('signe +') || spec.low.includes('payeur') || spec.low.includes('recu') || spec.low.includes('reçu');
    const amount = incoming ? '+48.200 CFA' : '-48.200 CFA';
    const partyLine = incoming ? 'Reçu de Awa Traoré' : 'Payé à Mamadou Diallo';
    const initials = incoming ? 'AT' : 'MD';
    return <>
      <section className="cap-detail-hero"><span className="cap-avatar large">{initials}</span><div><strong>{amount}</strong><p>{partyLine}</p><small>7 juin, 15:17</small></div></section>
      <div className="cap-actions-four"><button>Envoyer</button><button>Annuler</button><button>Partager</button><button>Planifier</button></div>
      <Field icon="hash" label="Référence" value="PI-2406-7721" />
      <Field icon="id-card" label="Identifiant" value="TX-2406-4581" />
      <OptionRow icon="file-down" title="Reçu du paiement" text="Télécharger ou partager le reçu" />
      <OptionRow icon="tag" title="Catégorie" text="Classer ce transfert" badge="Aucune" />
      <OptionRow icon="user-plus" title="Enregistrer dans les contacts" text="Alias du bénéficiaire" />
    </>;
  };

  const DecisionVisual = ({ spec }) => (
    <>
      <section className="cap-title-card warn"><span>Sécurité</span><h3>{spec.low.includes('supprimer') ? 'Supprimer l’alias' : 'Confirmer la demande'}</h3><p>Cette action nécessite une validation avant envoi au réseau SPI.</p></section>
      {spec.low.includes('motif') && <div className="cap-reason-list"><span>Alias contesté</span><span>Demande non reconnue</span><span>Autre raison</span></div>}
      <div className="cap-dialog"><strong>{spec.exactLabels[0] || 'Êtes-vous sûr ?'}</strong><p>L’opération sera confirmée après authentification.</p><div><button>Annuler</button><button>Confirmer</button></div></div>
      <div className="cap-auth"><M_Icon name="fingerprint" /> Validation par biométrie ou code PIN</div>
    </>
  );

  const ShareVisual = ({ spec }) => (
    <>
      <section className="cap-title-card"><span>Partage</span><h3>Partager avec</h3><p>Sélectionner les contacts du paiement partagé.</p></section>
      <div className="cap-search"><M_Icon name="search" /><span>Rechercher nom ou prénom</span></div>
      <TxRow name="Awa Traoré" meta="awa.tr@pi" amount="Sélectionné" tone="in" />
      <TxRow name="Koffi Mensah" meta="+225 07 00 00 00" amount="Alias requis" />
      <button className="cap-primary">Envoyer la demande</button>
    </>
  );

  const RequestVisual = ({ spec }) => (
    <>
      <section className="cap-title-card"><span>Demande</span><h3>Demande de paiement</h3><p>Demandée par Mamadou Diallo · 12.500 CFA</p></section>
      <Field icon="coins" label="Montant demandé" value="12.500 CFA" />
      <Field icon="at-sign" label="Alias du client payé" value="moustapha.k@pi" badge="copier" />
      <Field icon="calendar" label="Date d'échéance" value="7 juin, 15:17" />
      <OptionRow icon="shopping-bag" title="Retrait avec Achat (PICO)" text="Achat 20.000 CFA · Retrait 5.000 CFA · Gratuit" />
      <OptionRow icon="globe" title="Site e-commerce vérifié" text="Canal 521 · paiement en ligne" />
      <div className="cap-inline-actions"><button>Payer</button><button>Programmer</button><button>Rejeter</button></div>
    </>
  );

  const HistoryVisual = ({ spec }) => (
    <>
      <div className="cap-search"><M_Icon name="search" /><span>Nom, référence, alias ou montant</span><button><M_Icon name="sliders-horizontal" /></button></div>
      <div className="cap-filter-pills"><span className="active">Statut</span><span>Période</span><span>Sens</span><span>Catégorie</span></div>
      <div className="cap-section-line"><strong>Liste complète</strong><span>Recherche active</span></div>
      {HOME_TXS.map(tx => <TxRow key={tx.name} {...tx} />)}
    </>
  );

  const SubscriptionVisual = ({ spec }) => (
    <>
      <section className="cap-title-card"><span>Planifié</span><h3>{spec.exactLabels[0] || 'Créer un abonnement'}</h3><p>Recherchez dans vos transactions et sélectionnez un envoi récurrent.</p></section>
      <OptionRow icon="calendar-clock" title="Transactions à venir" text="Gérez vos abonnements et vos paiements programmés en un seul endroit" badge="Nouveau" />
      <OptionRow icon="repeat-2" title="Créer un abonnement" text="Convertir un envoi en un abonnement" />
      <Field icon="repeat" label="Fréquence" value="Une seule fois · Quotidienne · Hebdomadaire · Mensuelle · Annuelle · Sur Mesure" />
      <Field icon="calendar" label="Prochain paiement" value="7 juin, 15:17" />
      <div className="cap-inline-actions"><button>Éditer</button><button>Désactiver</button><button>Réactiver</button><button>Supprimer</button></div>
    </>
  );

  const GenericVisual = ({ spec }) => {
    const low = spec.low;
    const meta = screenMeta(spec);
    const rawLabels = spec.exactLabels.length ? spec.exactLabels : ['Continuer', 'Partager', 'Copier'];
    const labels = rawLabels
      .map(label => label.trim())
      .filter(label => label.length > 1 && !/^[+\-–—]+$/.test(label))
      .slice(0, 4);
    const wantsNegative = low.includes('signe "-"') || low.includes('signe -') || low.includes('payé') || low.includes('paye');
    const wantsPositive = low.includes('signe "+"') || low.includes('signe +') || low.includes('payeur') || low.includes('recu') || low.includes('reçu');
    const amount = wantsPositive ? '+48.200 CFA' : wantsNegative ? '-48.200 CFA' : '48.200 CFA';
    const party = low.includes('payeur') ? 'Awa Traoré' : low.includes('contact') ? 'Mamadou Diallo' : 'Mamadou Diallo';
    const showLogo = low.includes('logo');
    const showSearch = low.includes('rechercher') || low.includes('barre de recherche');
    const showAmount = low.includes('montant') || low.includes('signe');
    const showDate = low.includes('date') || low.includes('7 juin');
    const showAlias = low.includes('alias');
    const showReference = low.includes('reference') || low.includes('référence') || low.includes('endtoendid') || low.includes('identifiant') || low.includes('txid');
    const showAvatar = low.includes('avatar') || low.includes('photo');
    const showButton = low.includes('bouton') || labels.some(label => label.length <= 32);
    return (
      <>
        <section className="cap-title-card">
          <span>PI SPI</span>
          <h3>{meta.title}</h3>
          <p>{meta.subtitle}</p>
        </section>
        {showLogo && <div className="cap-service-card featured"><img src="assets/logo-spi-dark.png" alt="PI-SPI" /><div><strong>PI SPI</strong><small>Service réglementé BCEAO</small></div><button>Ouvrir</button></div>}
        {showSearch && <div className="cap-search"><M_Icon name="search" /><span>Rechercher par nom, prénom, alias, référence ou montant</span><button><M_Icon name="sliders-horizontal" /></button></div>}
        {showAvatar && <section className="cap-profile-head"><span className="cap-avatar large">{party.split(' ').map(x => x[0]).slice(0,2).join('')}</span><div><h3>{party}</h3><p>mamadou.d@pi</p></div><button><M_Icon name="camera" /></button></section>}
        {showAmount && <Field icon="coins" label="Montant" value={amount} />}
        {(low.includes('nom du client') || low.includes('envoyé à') || low.includes('envoye a') || low.includes('reçu de') || low.includes('recu de')) && <TxRow name={party} meta="7 juin, 15:17" amount={amount} tone={wantsPositive ? 'in' : 'out'} />}
        {showDate && <Field icon="calendar" label={low.includes('prochain') ? 'Prochain paiement' : low.includes('programme') ? 'Programmé pour' : 'Date'} value="7 juin, 15:17" />}
        {showAlias && <Field icon="at-sign" label="Alias" value="mamadou.d@pi" badge="copier" />}
        {showReference && <><Field icon="hash" label="Référence" value="PI-2406-7721" badge="copier" /><Field icon="id-card" label="Identifiant" value="TX-2406-4581" badge="copier" /></>}
        {!showAmount && !showDate && !showAlias && !showReference && !showAvatar && <TxRow name={party} meta="7 juin, 15:17" amount={amount} tone={wantsPositive ? 'in' : 'out'} />}
        {!showReference && <Field icon="hash" label="Référence" value="PI-2406-7721" badge="copier" />}
        <OptionRow icon="tag" title="Catégorie" text="Classer ce transfert" badge="Aucune" />
        {labels.length > 0 && <div className="cap-context-list">
          {labels.map((label, i) => <span key={i}>{label}</span>)}
        </div>}
        {showButton && <div className="cap-inline-actions">{labels.slice(0, 4).map((label, i) => <button key={i}>{short(label, 24)}</button>)}</div>}
        <button className="cap-primary">Continuer</button>
      </>
    );
  };

  const Visual = ({ spec }) => {
    const map = {
      entry: EntryVisual,
      alias: AliasVisual,
      phone: PhoneVisual,
      otp: OtpVisual,
      home: HomeVisual,
      notification: NotificationVisual,
      profile: ProfileVisual,
      contacts: ContactsVisual,
      qr: QrVisual,
      'send-options': SendOptionsVisual,
      'request-options': RequestOptionsVisual,
      form: FormVisual,
      confirmation: ConfirmationVisual,
      detail: DetailVisual,
      decision: DecisionVisual,
      share: ShareVisual,
      request: RequestVisual,
      history: HistoryVisual,
      subscription: SubscriptionVisual,
      generic: GenericVisual,
    };
    const Cmp = map[spec.kind] || GenericVisual;
    return <Cmp spec={spec} />;
  };

  const productionScreenNode = (spec) => {
    const indexKey = String(spec.index);
    const numericIndex = Number(indexKey);
    const extraScreenIds = ['99a', '100a', '100b'];
    const inProductionRange = (numericIndex >= 1 && numericIndex <= 100) || (numericIndex >= 108 && numericIndex <= 826);
    if (!extraScreenIds.includes(indexKey) && !inProductionRange) return null;

    const Home = window.PiSPIHomeScreen;
    const Qr = window.PiSPIQrCodeScreen;
    const Send = window.PiSPISendOptionsScreen;
    const Request = window.PiSPIRequestOptionsScreen;
    const Form = window.PiSPITransactionFormScreen;
    const Review = window.PiSPITransferReviewScreen;
    const Details = window.PiSPITransactionDetailScreen;
    const History = window.PiSPITransactionSearchScreen;
    const AccountSwitch = window.PiSPIAccountSwitchScreen;
    const Notifications = window.PiSPINotificationsScreen;
    const ClaimDetail = window.PiSPIClaimDetailScreen;
    const ClaimDialog = window.PiSPIClaimAcceptDialogScreen;
    const MainHome = window.PiSPIMainAppHomeScreen;
    const Otp = window.PiSPIOtpCodeScreen;
    const OtpResult = window.PiSPIOtpResultModalScreen;
    const Alias = window.PiSPIAliasScreen;
    const AliasSuccess = window.PiSPIAliasSuccessScreen;
    const Phone = window.PiSPIPhoneNumberLockedScreen;
    const AliasProfile = window.PiSPIAliasProfileScreen;
    const ContactsAlias = window.PiSPIContactsAliasScreen;
    const CancelRequest = window.PiSPICancellationRequestScreen;
    const SharePayment = window.PiSPIPaymentShareScreen;
    const Receipt = window.PiSPIReceiptScreen;
    const ReturnFunds = window.PiSPIReturnFundsScreen;
    const CancelDetail = window.PiSPICancellationDetailScreen;
    const PaymentRequestDetail = window.PiSPIPaymentRequestDetailScreen;
    const PaymentRequestForm = window.PiSPIPaymentRequestFormScreen;
    const SubscriptionList = window.PiSPISubscriptionListScreen;
    const SubscriptionCreate = window.PiSPISubscriptionCreateScreen;
    const ScheduleForm = window.PiSPIScheduleFormScreen;
    const ScheduledDetail = window.PiSPIScheduledDetailScreen;
    const incomingTx = window.PISPI_TX?.[1];
    const failedReturnTx = incomingTx ? { ...incomingTx, amount: -Math.abs(incomingTx.amount), method: 'Retour de fonds' } : incomingTx;
    const homeNode = Home ? <Home onSend={() => {}} onReceive={() => {}} onSelectTx={() => {}} onShowAll={() => {}} /> : null;
    const notificationFilters = {
      69: 'all',
      70: 'all',
      71: 'unread',
      72: 'payment',
      73: 'transfer',
      74: 'cancellation',
      75: 'claim',
      76: 'subscription',
      77: 'savings',
      78: 'tontine',
      79: 'unread',
      80: 'grouped',
    };

    if (spec.index >= 1 && spec.index <= 3 && MainHome) return <MainHome onOpenPi={() => {}} />;
    if (spec.index === 4 && Alias) return <Alias onBack={() => {}} />;
    if (spec.index >= 5 && spec.index <= 12 && Alias) return <Alias onBack={() => {}} />;
    if (spec.index === 13 && AliasSuccess) return <AliasSuccess />;
    if (spec.index >= 14 && spec.index <= 16 && Phone) return <Phone onBack={() => {}} />;
    if (spec.index === 17 && Phone) return <Phone onBack={() => {}} dropdownOpen />;
    if (spec.index === 18 && Phone) return <Phone onBack={() => {}} />;
    if (spec.index >= 19 && spec.index <= 20 && Phone) return <Phone onBack={() => {}} keyboard />;
    if (spec.index === 21 && Phone) return <Phone onBack={() => {}} />;
    if (spec.index === 22 && Otp) return <Otp onBack={() => {}} />;
    if (spec.index >= 23 && spec.index <= 25 && Otp) return <Otp onBack={() => {}} />;
    if (spec.index === 26 && Otp) return <Otp onBack={() => {}} resendReady />;
    if (spec.index === 27 && Otp) return <Otp onBack={() => {}} keyboard />;
    if (spec.index === 28 && Otp) return <Otp onBack={() => {}} keyboard filled />;
    if (spec.index === 29 && Otp) return <Otp onBack={() => {}} keyboard error errorMessage="Le code OTP saisi est incorrect" />;
    if (spec.index >= 30 && spec.index <= 32 && AliasSuccess) return <AliasSuccess />;
    if (spec.index === 33 && Qr) return <Qr mode="share-choice" />;
    if (spec.index === 34 && OtpResult) return <OtpResult variant="failure" />;
    if (spec.index === 35 && OtpResult) return <OtpResult variant="claim-pending" />;
    if (spec.index === 36 && OtpResult) return <OtpResult variant="success" />;
    if (spec.index === 37 && OtpResult) return <OtpResult variant="failure" />;
    if (spec.index === 38 && OtpResult) return <OtpResult variant="claim-sent" />;
    if (spec.index === 39 && OtpResult) return <OtpResult variant="claim-sent-home" />;
    if (spec.index === 40 && Alias) return <Alias onBack={() => {}} />;
    if (spec.index >= 41 && spec.index <= 50) return homeNode;

    if (spec.index === 52 && Qr) return <Qr />;
    if (spec.index === 56 && Send) return <Send onBack={() => {}} />;
    if (spec.index === 59 && Request) return <Request onBack={() => {}} />;
    if (spec.index === 63 && History) return <History onBack={() => {}} />;
    if (spec.index === 68 && AccountSwitch) return <AccountSwitch onBack={() => {}} />;
    if (spec.index >= 69 && spec.index <= 84 && Notifications) {
      return <Notifications filter={notificationFilters[spec.index] || 'claim'} />;
    }
    if (spec.index >= 85 && spec.index <= 90 && ClaimDetail) return <ClaimDetail />;
    if (spec.index === 91 && ClaimDetail) return <ClaimDetail mode="refuse" />;
    if (spec.index === 92 && ClaimDetail) return <ClaimDetail mode="accept" />;
    if (spec.index === 93 && Otp) return <Otp onBack={() => {}} keyboard />;
    if (spec.index >= 94 && spec.index <= 97 && ClaimDialog) return <ClaimDialog />;
    if (spec.index === 98 && ClaimDialog) return <ClaimDialog variant="auth" />;
    if (spec.index === 99 && ClaimDialog) return <ClaimDialog variant="success" />;
    if (indexKey === '99a' && ClaimDetail) return <ClaimDetail mode="accepted" />;
    if (spec.index === 100 && Otp) return <Otp onBack={() => {}} />;
    if (indexKey === '100a' && Otp) return <Otp onBack={() => {}} keyboard resendReady />;
    if (indexKey === '100b' && Otp) return <Otp onBack={() => {}} keyboard error errorMessage="Le code OTP saisi est incorrect" />;
    if (spec.index >= 108 && spec.index <= 114 && AliasProfile) {
      if (spec.index === 109 || spec.index === 111) return <AliasProfile mode="avatar-edit" />;
      if (spec.index === 110) return <AliasProfile mode="avatar-updated" />;
      if (spec.index >= 112 && spec.index <= 114) return <AliasProfile mode="profile-photo" />;
      return <AliasProfile />;
    }
    if (spec.index >= 115 && spec.index <= 120 && AliasProfile) return <AliasProfile mode="account" />;
    if (spec.index === 121 && AliasProfile) return <AliasProfile mode="delete-confirm" />;
    if (spec.index === 122 && AliasProfile) return <AliasProfile mode="delete-auth" />;
    if (spec.index === 123 && Alias) return <Alias onBack={() => {}} />;
    if (spec.index === 124 && AliasProfile) return <AliasProfile mode="delete-success" />;
    if (spec.index >= 125 && spec.index <= 128 && ContactsAlias) return <ContactsAlias />;
    if (spec.index >= 129 && spec.index <= 134 && ContactsAlias) return <ContactsAlias mode="new-form" />;
    if (spec.index === 135 && ContactsAlias) return <ContactsAlias mode="permission" />;
    if (spec.index >= 136 && spec.index <= 138 && ContactsAlias) return <ContactsAlias />;
    if (spec.index === 139 && ContactsAlias) return <ContactsAlias mode="add-alias" />;
    if (spec.index === 140 && ContactsAlias) return <ContactsAlias mode="contact-actions" />;
    if (spec.index === 141 && ContactsAlias) return <ContactsAlias mode="edit-alias" />;
    if (spec.index === 142 && ContactsAlias) return <ContactsAlias mode="delete-contact" />;
    if (spec.index === 143 && ContactsAlias) return <ContactsAlias mode="alias-removed" />;
    if (spec.index === 144 && Qr) return <Qr />;
    if (spec.index >= 145 && spec.index <= 148 && Qr) return <Qr mode="share-action" />;
    if (spec.index === 149 && Qr) return <Qr mode="share-choice" />;
    if (spec.index === 150 && Qr) return <Qr mode="share-image" />;
    if (spec.index === 151 && Qr) return <Qr />;
    if ((spec.index === 152 || spec.index === 153 || spec.index === 154 || spec.index === 155 || spec.index === 160) && Qr) return <Qr mode="scan" />;
    if ((spec.index === 156 || spec.index === 161) && Form) return <Form mode="qr-no-amount" />;
    if ((spec.index === 157 || spec.index === 162) && Review) return <Review />;
    if ((spec.index === 158 || spec.index === 163) && Review) return <Review referenceLabel />;
    if (spec.index === 159 && Qr) return <Qr mode="scan-error" />;
    if (spec.index === 164 && Qr) return <Qr mode="gallery-error" />;
    if (spec.index === 165 && Qr) return <Qr />;
    if (spec.index === 166 && Send) return <Send onBack={() => {}} />;
    if (spec.index === 167 && Send) return <Send onBack={() => {}} mode="search-active" />;
    if (spec.index === 168 && Send) return <Send onBack={() => {}} mode="search-restored" />;
    if (spec.index === 169 && Send) return <Send onBack={() => {}} mode="qr-focus" />;
    if (spec.index === 170 && Qr) return <Qr mode="scan" />;
    if (spec.index >= 171 && spec.index <= 180 && Send) return <Send onBack={() => {}} mode={spec.index === 176 ? 'iban-disabled' : 'default'} />;
    if (spec.index >= 181 && spec.index <= 184 && Send) return <Send onBack={() => {}} />;
    if (spec.index === 185 && Form) return <Form mode="recent-prefill" />;
    if (spec.index === 186 && Send) return <Send onBack={() => {}} />;
    if (spec.index === 187 && Send) return <Send onBack={() => {}} mode="contact-permission" />;
    if (spec.index >= 188 && spec.index <= 191 && Send) return <Send onBack={() => {}} />;
    if (spec.index === 192 && Send) return <Send onBack={() => {}} mode="add-alias" />;
    if (spec.index === 193 && Send) return <Send onBack={() => {}} mode="add-alias-success" />;
    if (spec.index === 194 && Form) return <Form mode="contact-selected" />;
    if ((spec.index === 195 || spec.index === 196 || spec.index === 197) && Form) return <Form mode="alias-address" />;
    if (spec.index === 198 && Form) return <Form mode="alias-phone" />;
    if (spec.index === 199 && Form) return <Form mode="alias-address" />;
    if (spec.index === 200 && Form) return <Form mode="alias-contact" />;
    if (spec.index === 201 && Form) return <Form mode="alias-address" />;
    if (spec.index === 202 && Form) return <Form mode="alias-invalid" />;
    if (spec.index >= 203 && spec.index <= 205 && Form) return <Form mode="alias-address" />;
    if (spec.index === 206 && Form) return <Form mode="alias-insufficient" />;
    if (spec.index >= 207 && spec.index <= 209 && Form) return <Form mode="alias-address" />;
    if (spec.index >= 210 && spec.index <= 217 && Review) return <Review />;
    if (spec.index === 218 && Review) return <Review mode="fee-charged" />;
    if (spec.index >= 219 && spec.index <= 220 && Review) return <Review />;
    if (spec.index === 221 && Review) return <Review mode="geo" />;
    if (spec.index === 222 && Review) return <Review mode="auth" />;
    if (spec.index === 223 && Review) return <Review mode="loading" />;
    if (spec.index === 224 && Review) return <Review mode="success" />;
    if (spec.index === 225 && Review) return <Review mode="failure" />;
    if (spec.index === 226 && Review) return <Review mode="timeout" />;
    if (spec.index === 227 && Review) return <Review mode="program" />;
    if (spec.index >= 228 && spec.index <= 231 && Form) return <Form mode="account-default" />;
    if (spec.index === 232 && Form) return <Form mode="account-default" />;
    if (spec.index === 233 && Form) return <Form mode="account-default" />;
    if (spec.index === 234 && Form) return <Form mode="account-phone-local" />;
    if (spec.index === 235 && Form) return <Form mode="account-phone-intl" />;
    if (spec.index === 236 && Form) return <Form mode="account-contact" />;
    if (spec.index === 237 && Form) return <Form mode="account-iban" />;
    if (spec.index === 238 && Form) return <Form mode="account-rib" />;
    if (spec.index === 239 && Form) return <Form mode="account-default" />;
    if (spec.index === 240 && Form) return <Form mode="account-paste" />;
    if (spec.index === 241 && Form) return <Form mode="account-default" />;
    if (spec.index === 242 && Form) return <Form mode="account-country-locked" />;
    if (spec.index === 243 && Form) return <Form mode="account-country-select" />;
    if (spec.index === 244 && Form) return <Form mode="account-uemoa" />;
    if (spec.index === 245 && Form) return <Form mode="account-bank-select" />;
    if (spec.index === 246 && Form) return <Form mode="account-bank-locked" />;
    if (spec.index === 247 && Form) return <Form mode="account-bank-disabled" />;
    if (spec.index === 248 && Form) return <Form mode="account-bank-missing" />;
    if (spec.index === 249 && Form) return <Form mode="account-bank-select" />;
    if (spec.index === 250 && Form) return <Form mode="account-country-banks" />;
    if (spec.index === 251 && Form) return <Form mode="account-country-banks" />;
    if (spec.index === 252 && Form) return <Form mode="account-bank-disabled" />;
    if (spec.index === 253 && Form) return <Form mode="account-default" />;
    if (spec.index >= 254 && spec.index <= 256 && Form) return <Form mode="account-default" />;
    if (spec.index === 257 && Form) return <Form mode="account-insufficient" />;
    if (spec.index >= 258 && spec.index <= 260 && Form) return <Form mode="account-default" />;
    if (spec.index >= 261 && spec.index <= 268 && Review) return <Review channel="account" />;
    if (spec.index === 269 && Review) return <Review channel="account" mode="fee-charged" />;
    if (spec.index >= 270 && spec.index <= 271 && Review) return <Review channel="account" />;
    if (spec.index === 272 && Review) return <Review channel="account" mode="geo" />;
    if (spec.index === 273 && Review) return <Review channel="account" mode="auth" />;
    if (spec.index === 274 && Review) return <Review channel="account" mode="loading" />;
    if (spec.index === 275 && Review) return <Review channel="account" mode="success" />;
    if (spec.index === 276 && Review) return <Review channel="account" mode="failure" />;
    if (spec.index === 277 && Review) return <Review channel="account" mode="timeout" />;
    if (spec.index === 278 && Review) return <Review channel="account" mode="program" />;
    if (spec.index >= 279 && spec.index <= 288 && Form) return <Form mode="iban-default" />;
    if (spec.index === 289 && Form) return <Form mode="iban-insufficient" />;
    if (spec.index >= 290 && spec.index <= 292 && Form) return <Form mode="iban-default" />;
    if (spec.index === 293 && Review) return <Review channel="iban" />;
    if (spec.index >= 294 && spec.index <= 298 && ContactsAlias) return <ContactsAlias mode="new-form" />;
    if (spec.index === 299 && ContactsAlias) return <ContactsAlias mode="new-form-phone" />;
    if (spec.index === 300 && ContactsAlias) return <ContactsAlias mode="new-form" />;
    if (spec.index === 301 && ContactsAlias) return <ContactsAlias mode="new-form-invalid" />;
    if (spec.index === 302 && Form) return <Form mode="contact-send" />;
    if (spec.index >= 303 && spec.index <= 307 && Form) return <Form mode="contact-send" />;
    if (spec.index === 308 && Form) return <Form mode="contact-send-insufficient" />;
    if (spec.index >= 309 && spec.index <= 311 && Form) return <Form mode="contact-send" />;
    if (spec.index >= 312 && spec.index <= 317 && Form) return <Form mode="recent-send" />;
    if (spec.index >= 318 && spec.index <= 322 && Details) return <Details />;
    if (spec.index === 323 && Form) return <Form mode="alias-address" />;
    if (spec.index === 324 && Form) return <Form mode="account-default" />;
    if (spec.index === 325 && Form) return <Form mode="iban-default" />;
    if (spec.index === 326 && CancelRequest) return <CancelRequest />;
    if (spec.index === 327 && Details) return <Details mode="cancel-disabled" />;
    if (spec.index === 328 && Request) return <Request onBack={() => {}} />;
    if (spec.index === 329 && Review) return <Review mode="program" />;
    if (spec.index >= 330 && spec.index <= 340 && Details) return <Details />;
    if (spec.index === 341 && Details) return <Details channel="account" />;
    if (spec.index === 342 && Details) return <Details />;
    if (spec.index === 343 && Details) return <Details mode="cancellation-info" />;
    if (spec.index === 344 && Details) return <Details mode="refund-info" />;
    if (spec.index >= 345 && spec.index <= 349 && CancelRequest) return <CancelRequest />;
    if (spec.index === 350 && CancelRequest) return <CancelRequest mode="success" />;
    if (spec.index >= 351 && spec.index <= 354 && CancelRequest) return <CancelRequest mode="success" />;
    if ((spec.index === 355 || spec.index === 356) && SharePayment) return <SharePayment />;
    if (spec.index === 357 && SharePayment) return <SharePayment mode="permission" />;
    if (spec.index >= 358 && spec.index <= 361 && SharePayment) return <SharePayment />;
    if (spec.index === 362 && SharePayment) return <SharePayment mode="add-alias" />;
    if (spec.index === 363 && SharePayment) return <SharePayment mode="add-alias-success" />;
    if (spec.index === 364 && SharePayment) return <SharePayment mode="add-alias-phone-error" />;
    if (spec.index === 365 && SharePayment) return <SharePayment mode="add-alias" />;
    if (spec.index === 366 && SharePayment) return <SharePayment mode="add-alias-phone-error" />;
    if (spec.index === 367 && SharePayment) return <SharePayment />;
    if (spec.index >= 368 && spec.index <= 374 && SharePayment) return <SharePayment mode="form" />;
    if (spec.index === 375 && SharePayment) return <SharePayment mode="sent" />;
    if (spec.index >= 376 && spec.index <= 384 && Receipt) return <Receipt />;
    if (spec.index === 385 && Receipt) return <Receipt mode="fee" />;
    if (spec.index >= 386 && spec.index <= 387 && Receipt) return <Receipt />;
    if (spec.index >= 388 && spec.index <= 389 && Receipt) return <Receipt mode="account" />;
    if (spec.index >= 390 && spec.index <= 391 && Receipt) return <Receipt />;
    if (spec.index >= 392 && spec.index <= 397 && Details) return <Details tx={incomingTx} mode="incoming" />;
    if (spec.index === 398 && Form) return <Form mode="alias-address" />;
    if ((spec.index === 399 || spec.index === 400) && Request) return <Request onBack={() => {}} />;
    if (spec.index === 401 && ReturnFunds) return <ReturnFunds />;
    if (spec.index >= 402 && spec.index <= 413 && Details) return <Details tx={incomingTx} mode="incoming" />;
    if (spec.index === 414 && Details) return <Details tx={incomingTx} mode="cancellation-info" />;
    if (spec.index === 415 && Details) return <Details tx={incomingTx} mode="refund-info" />;
    if (spec.index >= 416 && spec.index <= 418 && ReturnFunds) return <ReturnFunds />;
    if (spec.index === 419 && ReturnFunds) return <ReturnFunds mode="insufficient" />;
    if (spec.index >= 420 && spec.index <= 421 && ReturnFunds) return <ReturnFunds />;
    if (spec.index === 422 && ReturnFunds) return <ReturnFunds mode="auth" />;
    if (spec.index === 423 && ReturnFunds) return <ReturnFunds mode="loading" />;
    if (spec.index === 424 && ReturnFunds) return <ReturnFunds mode="success" />;
    if (spec.index === 425 && ReturnFunds) return <ReturnFunds mode="failure" />;
    if (spec.index === 426 && ReturnFunds) return <ReturnFunds mode="timeout" />;
    if (spec.index >= 427 && spec.index <= 435 && Receipt) return <Receipt mode="received" />;
    if (spec.index === 436 && Receipt) return <Receipt mode="received-fee" />;
    if (spec.index >= 437 && spec.index <= 440 && Receipt) return <Receipt mode="received" />;
    if (spec.index >= 441 && spec.index <= 446 && Notifications) return <Notifications filter="transfer" />;
    if (spec.index >= 447 && spec.index <= 448 && Details) return <Details />;
    if (spec.index === 449 && Details) return <Details tx={incomingTx} mode="incoming" />;
    if (spec.index === 450 && Details) return <Details />;
    if (spec.index === 451 && Details) return <Details tx={failedReturnTx} mode="failed-return" />;
    if (spec.index >= 452 && spec.index <= 462 && Details) return <Details mode="failed" />;
    if (spec.index >= 463 && spec.index <= 468 && Notifications) return <Notifications filter="cancellation" />;
    if (spec.index >= 469 && spec.index <= 480 && CancelDetail) return <CancelDetail />;
    if ((spec.index === 481 || spec.index === 482) && CancelDetail) return <CancelDetail mode="reject-success" />;
    if (spec.index === 483 && CancelDetail) return <CancelDetail mode="auth" />;
    if (spec.index === 484 && CancelDetail) return <CancelDetail mode="loading" />;
    if (spec.index === 485 && CancelDetail) return <CancelDetail mode="success" />;
    if (spec.index === 486 && CancelDetail) return <CancelDetail mode="failure" />;
    if (spec.index === 487 && CancelDetail) return <CancelDetail mode="timeout" />;
    if (spec.index >= 488 && spec.index <= 491 && Notifications) return <Notifications filter="payment" />;
    if (spec.index >= 492 && spec.index <= 500 && PaymentRequestDetail) return <PaymentRequestDetail />;
    if (spec.index === 501 && PaymentRequestDetail) return <PaymentRequestDetail />;
    if (spec.index >= 502 && spec.index <= 506 && PaymentRequestDetail) return <PaymentRequestDetail mode="shared" />;
    if (spec.index >= 507 && spec.index <= 516 && History) return <History onBack={() => {}} />;
    if (spec.index >= 517 && spec.index <= 522 && History) return <History onBack={() => {}} mode="filters" />;
    if (spec.index === 523 && Request) return <Request onBack={() => {}} />;
    if (spec.index === 524 && Request) return <Request onBack={() => {}} mode="search-active" />;
    if (spec.index === 525 && Request) return <Request onBack={() => {}} />;
    if (spec.index === 526 && Request) return <Request onBack={() => {}} mode="qr-focus" />;
    if (spec.index === 527 && Qr) return <Qr mode="scan" />;
    if (spec.index >= 528 && spec.index <= 530 && Request) return <Request onBack={() => {}} />;
    if (spec.index === 531 && PaymentRequestForm) return <PaymentRequestForm />;
    if (spec.index >= 532 && spec.index <= 539 && Request) return <Request onBack={() => {}} />;
    if (spec.index === 540 && PaymentRequestForm) return <PaymentRequestForm mode="prefill" />;
    if (spec.index === 541 && Request) return <Request onBack={() => {}} />;
    if (spec.index === 542 && Request) return <Request onBack={() => {}} mode="contact-permission" />;
    if (spec.index >= 543 && spec.index <= 546 && Request) return <Request onBack={() => {}} />;
    if (spec.index === 547 && PaymentRequestForm) return <PaymentRequestForm mode="contact-no-alias" />;
    if (spec.index === 548 && PaymentRequestForm) return <PaymentRequestForm mode="contact-alias-added" />;
    if (spec.index === 549 && PaymentRequestForm) return <PaymentRequestForm mode="contact-alias" />;
    if (spec.index === 550 && PaymentRequestForm) return <PaymentRequestForm mode="phone-alias-warning" />;
    if (spec.index === 551 && PaymentRequestForm) return <PaymentRequestForm mode="phone-alias-edit" />;
    if (spec.index >= 552 && spec.index <= 554 && Qr) return <Qr mode="scan" />;
    if (spec.index === 555 && PaymentRequestForm) return <PaymentRequestForm mode="qr" />;
    if (spec.index === 556 && PaymentRequestForm) return <PaymentRequestForm mode="qr-amount-success" />;
    if (spec.index === 557 && PaymentRequestForm) return <PaymentRequestForm mode="qr-reference" />;
    if (spec.index === 558 && Qr) return <Qr mode="scan" />;
    if (spec.index === 559 && Qr) return <Qr mode="gallery-error" />;
    if (spec.index === 560 && PaymentRequestForm) return <PaymentRequestForm mode="qr" />;
    if (spec.index === 561 && PaymentRequestForm) return <PaymentRequestForm mode="qr-amount-success" />;
    if (spec.index === 562 && Qr) return <Qr />;
    if (spec.index >= 563 && spec.index <= 567 && PaymentRequestForm) return <PaymentRequestForm mode={spec.index === 563 ? 'qr' : spec.index === 567 ? 'qr-reference' : 'qr-amount'} />;
    if (spec.index === 568 && PaymentRequestForm) return <PaymentRequestForm mode="qr-geo" />;
    if (spec.index === 569 && PaymentRequestForm) return <PaymentRequestForm mode="qr-loading" />;
    if (spec.index === 570 && PaymentRequestForm) return <PaymentRequestForm mode="qr-success" />;
    if (spec.index >= 571 && spec.index <= 580 && PaymentRequestForm) return <PaymentRequestForm mode={spec.index === 576 ? 'alias-invalid' : 'alias'} />;
    if (spec.index === 581 && PaymentRequestForm) return <PaymentRequestForm mode="geo" />;
    if (spec.index === 582 && PaymentRequestForm) return <PaymentRequestForm mode="loading" />;
    if (spec.index === 583 && PaymentRequestForm) return <PaymentRequestForm mode="success" />;
    if (spec.index >= 584 && spec.index <= 590 && PaymentRequestForm) return <PaymentRequestForm mode="contact-alias" />;
    if (spec.index === 591 && PaymentRequestForm) return <PaymentRequestForm mode="contact-geo" />;
    if (spec.index === 592 && PaymentRequestForm) return <PaymentRequestForm mode="contact-loading" />;
    if (spec.index === 593 && PaymentRequestForm) return <PaymentRequestForm mode="contact-success" />;
    if (spec.index >= 594 && spec.index <= 597 && Notifications) return <Notifications filter="payment" />;
    if (spec.index >= 598 && spec.index <= 600 && PaymentRequestDetail) return <PaymentRequestDetail mode="received" />;
    if (spec.index >= 601 && spec.index <= 609 && PaymentRequestDetail) return <PaymentRequestDetail mode="received" />;
    if (spec.index >= 610 && spec.index <= 614 && PaymentRequestDetail) return <PaymentRequestDetail mode="shared" />;
    if (spec.index >= 615 && spec.index <= 618 && PaymentRequestDetail) return <PaymentRequestDetail mode="pico" />;
    if (spec.index === 619 && PaymentRequestDetail) return <PaymentRequestDetail mode="pico-fee" />;
    if (spec.index >= 620 && spec.index <= 622 && PaymentRequestDetail) return <PaymentRequestDetail mode="picash" />;
    if (spec.index === 623 && PaymentRequestDetail) return <PaymentRequestDetail mode="picash-fee" />;
    if (spec.index >= 624 && spec.index <= 626 && PaymentRequestDetail) return <PaymentRequestDetail mode="deferred" />;
    if (spec.index >= 627 && spec.index <= 628 && PaymentRequestDetail) return <PaymentRequestDetail mode="invoice" />;
    if (spec.index >= 629 && spec.index <= 631 && PaymentRequestDetail) return <PaymentRequestDetail mode="online" />;
    if (spec.index === 632 && PaymentRequestDetail) return <PaymentRequestDetail mode="program" />;
    if (spec.index >= 633 && spec.index <= 634 && PaymentRequestDetail) return <PaymentRequestDetail mode="security" />;
    if (spec.index === 635 && PaymentRequestDetail) return <PaymentRequestDetail mode="reject" />;
    if (spec.index === 636 && PaymentRequestDetail) return <PaymentRequestDetail mode="geo" />;
    if (spec.index === 637 && PaymentRequestDetail) return <PaymentRequestDetail mode="auth" />;
    if (spec.index === 638 && PaymentRequestDetail) return <PaymentRequestDetail mode="loading" />;
    if (spec.index === 639 && PaymentRequestDetail) return <PaymentRequestDetail mode="success" />;
    if (spec.index === 640 && PaymentRequestDetail) return <PaymentRequestDetail mode="failure" />;
    if (spec.index === 641 && PaymentRequestDetail) return <PaymentRequestDetail mode="timeout" />;
    if (spec.index === 642 && PaymentRequestDetail) return <PaymentRequestDetail mode="reject-reasons" />;
    if (spec.index >= 643 && spec.index <= 644 && PaymentRequestDetail) return <PaymentRequestDetail mode="reject-success" />;
    if (spec.index >= 645 && spec.index <= 647 && SubscriptionList) return <SubscriptionList mode="empty" />;
    if (spec.index >= 648 && spec.index <= 650 && SubscriptionList) return <SubscriptionList mode="new-sheet" />;
    if (spec.index === 651 && SubscriptionCreate) return <SubscriptionCreate mode="select" />;
    if (spec.index >= 652 && spec.index <= 654 && SubscriptionList) return <SubscriptionList mode="grouped" />;
    if (spec.index === 655 && SubscriptionList) return <SubscriptionList mode="single" />;
    if (spec.index >= 656 && spec.index <= 658 && SubscriptionCreate) return <SubscriptionCreate mode="select" />;
    if (spec.index >= 659 && spec.index <= 660 && SubscriptionCreate) return <SubscriptionCreate mode={spec.index === 660 ? 'success' : 'selected'} />;
    if (spec.index === 661 && ScheduledDetail) return <ScheduledDetail mode="subscription" />;
    if (spec.index === 662 && Send) return <Send onBack={() => {}} />;
    if (spec.index === 663 && Send) return <Send onBack={() => {}} mode="search-active" />;
    if (spec.index === 664 && Send) return <Send onBack={() => {}} />;
    if (spec.index === 665 && Send) return <Send onBack={() => {}} mode="qr-focus" />;
    if (spec.index === 666 && Qr) return <Qr mode="scan" />;
    if (spec.index >= 667 && spec.index <= 680 && Send) return <Send onBack={() => {}} mode={spec.index === 672 ? 'iban-disabled' : 'default'} />;
    if (spec.index === 681 && Form) return <Form mode="recent-send" />;
    if (spec.index === 682 && Send) return <Send onBack={() => {}} />;
    if (spec.index === 683 && Send) return <Send onBack={() => {}} mode="contact-permission" />;
    if (spec.index >= 684 && spec.index <= 687 && Send) return <Send onBack={() => {}} />;
    if (spec.index === 688 && Send) return <Send onBack={() => {}} mode="add-alias" />;
    if (spec.index === 689 && Send) return <Send onBack={() => {}} mode="add-alias-success" />;
    if (spec.index === 690 && Form) return <Form mode="contact-send" />;
    if (spec.index >= 691 && spec.index <= 702 && Form) {
      if (spec.index === 694) return <Form mode="alias-phone" />;
      if (spec.index === 696) return <Form mode="alias-contact" />;
      if (spec.index === 698) return <Form mode="alias-invalid" />;
      return <Form mode="alias-address" />;
    }
    if (spec.index === 703 && Review) return <Review />;
    if (spec.index >= 704 && spec.index <= 715 && Review) return <Review mode={spec.index === 713 ? 'fee-charged' : 'default'} />;
    if (spec.index === 716 && ScheduleForm) return <ScheduleForm />;
    if (spec.index === 717 && Review) return <Review mode="auth" />;
    if (spec.index === 718 && Review) return <Review mode="loading" />;
    if (spec.index === 719 && Review) return <Review mode="success" />;
    if (spec.index === 720 && Review) return <Review mode="failure" />;
    if (spec.index >= 721 && spec.index <= 750 && Form) {
      if (spec.index === 727) return <Form mode="account-phone-local" />;
      if (spec.index === 728) return <Form mode="account-phone-intl" />;
      if (spec.index === 729) return <Form mode="account-contact" />;
      if (spec.index === 730) return <Form mode="account-iban" />;
      if (spec.index === 731) return <Form mode="account-rib" />;
      if (spec.index === 733) return <Form mode="account-paste" />;
      if (spec.index === 734) return <Form mode="account-country-select" />;
      if (spec.index === 735) return <Form mode="account-iban" />;
      if (spec.index >= 736 && spec.index <= 737) return <Form mode="account-uemoa" />;
      if (spec.index === 738) return <Form mode="account-bank-select" />;
      if (spec.index === 739) return <Form mode="account-bank-locked" />;
      if (spec.index === 740) return <Form mode="account-bank-disabled" />;
      if (spec.index === 741) return <Form mode="account-bank-missing" />;
      if (spec.index >= 742 && spec.index <= 745) return <Form mode={spec.index === 744 ? 'account-bank-disabled' : 'account-country-banks'} />;
      if (spec.index === 748) return <Form mode="account-insufficient" />;
      return <Form mode="account-default" />;
    }
    if (spec.index >= 751 && spec.index <= 762 && Review) return <Review channel="account" mode={spec.index === 762 ? 'program' : spec.index === 759 ? 'fee-charged' : 'default'} />;
    if (spec.index >= 763 && spec.index <= 773 && Form) return <Form mode="iban-default" />;
    if (spec.index >= 774 && spec.index <= 775 && Review) return <Review channel="iban" />;
    if (spec.index >= 776 && spec.index <= 782 && ContactsAlias) return <ContactsAlias mode={spec.index === 781 ? 'new-form-phone' : 'new-form'} />;
    if (spec.index === 783 && ContactsAlias) return <ContactsAlias mode="new-form-invalid" />;
    if (spec.index === 784 && Send) return <Send onBack={() => {}} mode="add-alias-success" />;
    if (spec.index >= 785 && spec.index <= 793 && Form) return <Form mode={spec.index === 790 ? 'contact-send-insufficient' : 'contact-send'} />;
    if (spec.index >= 794 && spec.index <= 799 && Form) return <Form mode="recent-send" />;
    if (spec.index >= 800 && spec.index <= 802 && ScheduleForm) return <ScheduleForm />;
    if (spec.index === 803 && ScheduleForm) return <ScheduleForm mode="geo" />;
    if (spec.index >= 804 && spec.index <= 806 && ScheduledDetail) return <ScheduledDetail mode="subscription" />;
    if (spec.index === 807 && ScheduledDetail) return <ScheduledDetail mode="scheduled" />;
    if (spec.index >= 808 && spec.index <= 824 && ScheduledDetail) return <ScheduledDetail mode={spec.index === 815 ? 'scheduled' : 'subscription'} />;
    if (spec.index === 825 && ScheduledDetail) return <ScheduledDetail mode="account" />;
    if (spec.index === 826 && ScheduledDetail) return <ScheduledDetail mode="subscription" />;
    return homeNode;
  };

  const TestPhone = ({ test, onDownload, onHide }) => {
    const spec = makeSpec(test);
    const meta = screenMeta(spec);
    const productionNode = productionScreenNode(spec);
    const isProductionScreen = !!productionNode;
    const isDragging = draggedTestId === String(spec.index);
    const isDropTarget = dragTarget?.beforeId === String(spec.index);
    return (
      <article
        className={`cap-card ${isDragging ? 'is-dragging' : ''} ${isDropTarget ? 'is-drop-target' : ''}`}
        data-test-index={spec.index}
        data-test-title={spec.title}
        data-test-status="PASS"
        onDragOver={(event) => handleDragOver(event, spec.index)}
        onDrop={(event) => handleDrop(event, spec.index)}
      >
        <div className="cap-frame">
          <div className={`phone cap-phone ${isProductionScreen ? 'cap-phone-production' : ''}`} data-test-index={spec.index} data-test-status="PASS">
            {isProductionScreen ? (
              <div className="phone-screen">
                {productionNode}
              </div>
            ) : (
              <div className="phone-screen cap-screen">
                <StatusBar />
                <div className="cap-nav">
                  <button aria-label="Retour"><M_Icon name="chevron-left" /></button>
                  <div><strong>{meta.title}</strong><small>{meta.subtitle}</small></div>
                  <button aria-label="Options"><M_Icon name={spec.kind === 'qr' ? 'share-2' : spec.kind === 'home' ? 'bell' : 'more-horizontal'} /></button>
                </div>
                <div className="cap-body"><Visual spec={spec} /></div>
              </div>
            )}
          </div>
        </div>
        <div className="cap-caption">
          <button
            className="mk-drag-screen"
            type="button"
            draggable
            onPointerDown={(event) => handlePointerDragStart(event, spec.index)}
            onDragStart={(event) => handleDragStart(event, spec.index)}
            onDragEnd={handleDragEnd}
            title="Déplacer cet écran"
            aria-label={`Déplacer le test ${pad(spec.index)}`}
          >
            <M_Icon name="grip-vertical" />
          </button>
          <span className="cap-test-num">#{pad(spec.index)}</span>
          <div><strong>{spec.title}</strong><p>{short(spec.description, 180)}</p></div>
          <button type="button" className="mk-hide-screen" onClick={() => onHide(spec.index)} title="Masquer cet écran" aria-label={`Masquer le test ${pad(spec.index)}`}>
            <M_Icon name="eye-off" />
          </button>
          <button type="button" className="cap-download-one" onClick={() => onDownload(spec.index)} disabled={exportState.busy} title={`Télécharger ${filenameForTest(spec.index)}`}>
            <M_Icon name="download" /> PNG
          </button>
        </div>
      </article>
    );
  };
  return (
    <div className="mk-page pispi-capture-page" style={{ '--mk-phone-scale': 0.58 }}>
      <style>{`
        .pispi-capture-page { max-width: 1720px; }
        .cap-summary { display:flex; gap:12px; flex-wrap:wrap; margin-top:14px; }
        .cap-summary span { display:inline-flex; align-items:center; gap:8px; padding:8px 12px; border:1px solid var(--border-subtle); border-radius:999px; background:#fff; color:var(--fg-2); font-size:12px; font-weight:700; }
        .cap-range-nav { display:flex; flex-wrap:wrap; gap:6px; margin:16px 0 0; }
        .cap-range-nav button { padding:6px 10px; border-radius:999px; background:#fff; border:1px solid var(--border-subtle); color:var(--fg-2); text-decoration:none; font-size:11.5px; font-weight:700; font-family:inherit; cursor:pointer; }
        .cap-range-nav button.active { background:var(--brand-lime); border-color:var(--brand-lime-600); color:var(--brand-ink); }
        .cap-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(calc(402px * var(--mk-phone-scale) + 38px), 1fr)); gap:22px 18px; justify-items:center; border-radius:var(--radius-md); }
        .cap-grid.is-drop-zone { outline:1px dashed rgba(187,203,68,.7); outline-offset:8px; background:rgba(187,203,68,.06); }
        .cap-card { display:flex; flex-direction:column; align-items:center; gap:10px; width:calc(402px * var(--mk-phone-scale) + 38px); border-radius:var(--radius-md); transition:opacity 120ms, transform 120ms; }
        .cap-card.is-dragging { opacity:.45; transform:scale(.98); }
        .cap-card.is-drop-target .cap-frame::after { content:""; position:absolute; inset:-8px; border-radius:30px; border:2px solid var(--brand-lime); pointer-events:none; }
        .cap-frame { width:calc(402px * var(--mk-phone-scale)); height:calc(856px * var(--mk-phone-scale)); position:relative; }
        .cap-frame .phone { transform:scale(var(--mk-phone-scale)); transform-origin:top left; position:absolute; inset:0 auto auto 0; box-shadow:0 16px 36px rgba(14,17,16,.14), 0 2px 6px rgba(14,17,16,.06); }
        .cap-caption { display:flex; gap:8px; align-items:flex-start; width:100%; padding:0 2px; }
        .cap-caption div { flex:1; min-width:0; }
        .cap-caption strong { display:block; color:var(--fg-1); font-size:12px; line-height:1.25; }
        .cap-caption p { margin:3px 0 0; color:var(--fg-3); font-size:10.8px; line-height:1.35; }
        .cap-test-num { font-family:var(--font-mono); font-size:10.5px; font-weight:800; color:var(--brand-ink); background:var(--brand-lime); border-radius:999px; padding:3px 7px; flex-shrink:0; }
        .cap-download-one,.cap-export-range { border:1px solid var(--border-subtle); border-radius:999px; background:#fff; color:var(--fg-1); display:inline-flex; align-items:center; justify-content:center; gap:6px; font-family:inherit; font-size:10.5px; font-weight:850; cursor:pointer; }
        .cap-download-one { padding:5px 8px; flex-shrink:0; }
        .cap-download-one .lucide,.cap-export-range .lucide { width:14px; height:14px; }
        .cap-download-one:disabled,.cap-export-range:disabled { opacity:.5; cursor:wait; }
        .cap-export-row { display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-top:12px; }
        .cap-export-range { padding:8px 12px; background:var(--brand-lime); border-color:var(--brand-lime-600); color:var(--brand-ink); }
        .cap-export-range.all { background:#0E1110; border-color:#0E1110; color:#fff; }
        .cap-export-status { color:var(--fg-3); font-size:11.5px; font-weight:700; }
        .cap-screen { background:#FAFAF8; display:flex; flex-direction:column; overflow:hidden; }
        .cap-nav { height:58px; display:grid; grid-template-columns:36px 1fr 36px; align-items:center; gap:8px; padding:0 16px; flex-shrink:0; border-bottom:1px solid rgba(14,17,16,.06); background:#FAFAF8; }
        .cap-nav button { width:34px; height:34px; border:1px solid var(--border-subtle); border-radius:12px; background:#fff; color:var(--fg-1); display:grid; place-items:center; }
        .cap-nav div { min-width:0; text-align:center; }
        .cap-nav strong { display:block; color:var(--fg-1); font-size:14px; line-height:1.15; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .cap-nav small { display:block; color:var(--fg-3); font-size:10.5px; line-height:1.2; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .cap-nav .lucide { width:17px; height:17px; }
        .cap-body { flex:1; min-height:0; overflow:hidden; padding:12px 16px 14px; display:flex; flex-direction:column; gap:9px; }
        .cap-title-card,.cap-balance-card,.cap-service-card,.cap-dialog,.cap-scan-frame { background:#fff; border:1px solid var(--border-subtle); border-radius:16px; box-shadow:var(--shadow-xs); padding:12px; }
        .cap-title-card span { display:inline-flex; margin-bottom:8px; padding:3px 8px; border-radius:999px; background:#F1F5D7; color:#3D4707; font-size:10px; font-weight:800; }
        .cap-title-card.warn span { background:#FFF5D9; color:#7B4F00; }
        .cap-title-card h3 { margin:0; font-size:17px; line-height:1.14; color:var(--fg-1); }
        .cap-title-card p,.cap-center-sub { margin:5px 0 0; color:var(--fg-3); font-size:11.5px; line-height:1.35; }
        .cap-field,.cap-option-row,.cap-tx-row { display:flex; align-items:center; gap:10px; background:#fff; border:1px solid var(--border-subtle); border-radius:14px; padding:10px; min-height:48px; }
        .cap-field-icon,.cap-option-icon { width:30px; height:30px; display:grid; place-items:center; border-radius:10px; background:#F1F5D7; color:var(--brand-ink); flex-shrink:0; }
        .cap-field-icon .lucide,.cap-option-icon .lucide { width:16px; height:16px; }
        .cap-field div,.cap-option-row div,.cap-tx-row div { flex:1; min-width:0; }
        .cap-field small,.cap-option-row small,.cap-tx-row small { display:block; color:var(--fg-3); font-size:10.8px; line-height:1.25; }
        .cap-field strong,.cap-option-row strong,.cap-tx-row strong { display:block; color:var(--fg-1); font-size:12.5px; line-height:1.25; white-space:normal; }
        .cap-field em,.cap-option-row em { font-style:normal; font-size:10px; font-weight:800; color:#3D4707; background:#F1F5D7; border-radius:999px; padding:3px 7px; }
        .cap-primary,.cap-secondary,.cap-danger,.cap-inline-actions button,.cap-actions-two button,.cap-actions-three button,.cap-actions-four button,.cap-service-card button,.cap-dialog button,.cap-scan-frame button { border:1px solid var(--border-subtle); border-radius:12px; padding:8px 10px; background:#fff; color:var(--fg-1); font-size:11.5px; font-weight:800; font-family:inherit; }
        .cap-primary { background:var(--brand-lime); border-color:var(--brand-lime-600); color:var(--brand-ink); width:100%; }
        .cap-danger { color:#C8362D; border-color:rgba(200,54,45,.25); width:100%; }
        .cap-inline-actions,.cap-actions-two,.cap-actions-three,.cap-actions-four { display:flex; gap:7px; }
        .cap-actions-three button,.cap-actions-four button,.cap-actions-two button { flex:1; }
        .cap-avatar,.cap-avatar-btn { width:34px; height:34px; border-radius:12px; display:grid; place-items:center; background:#0E1110; color:#BBCB44; font-weight:900; font-size:12px; flex-shrink:0; }
        .cap-avatar.large { width:48px; height:48px; border-radius:16px; font-size:15px; }
        .cap-home-head,.cap-profile-head,.cap-detail-hero { display:flex; align-items:center; gap:10px; background:#0E1110; border-radius:18px; padding:12px; color:#fff; }
        .cap-home-head img { height:26px; flex:1; object-fit:contain; }
        .cap-home-head button { border:0; border-radius:10px; background:rgba(255,255,255,.12); color:#fff; width:30px; height:30px; }
        .cap-tabs,.cap-filter-pills,.cap-switch,.cap-context-list,.cap-reason-list,.cap-keypad { display:flex; flex-wrap:wrap; gap:6px; }
        .cap-tabs span,.cap-filter-pills span,.cap-switch span,.cap-context-list span,.cap-reason-list span,.cap-keypad span { padding:5px 8px; border-radius:999px; background:#fff; border:1px solid var(--border-subtle); color:var(--fg-2); font-size:10.5px; font-weight:800; }
        .cap-tabs .active,.cap-filter-pills .active,.cap-switch .active { background:var(--brand-lime); color:var(--brand-ink); }
        .cap-balance-hero { background:#0E1110; border-radius:18px; padding:16px; color:#fff; }
        .cap-balance-hero small,.cap-balance-hero em { display:block; color:#C5C5BC; font-size:11px; font-style:normal; }
        .cap-balance-hero strong { display:block; font-size:28px; line-height:1; margin:6px 0; }
        .cap-service-card { display:flex; align-items:center; gap:10px; }
        .cap-service-card.featured { border-color:rgba(187,203,68,.7); }
        .cap-service-card img { width:34px; height:34px; object-fit:contain; background:#0E1110; border-radius:10px; padding:4px; }
        .cap-service-card div { flex:1; }
        .cap-service-card strong { display:block; color:var(--fg-1); font-size:13px; }
        .cap-service-card small { display:block; color:var(--fg-3); font-size:10.5px; }
        .cap-flow,.cap-timer,.cap-auth { display:flex; align-items:center; gap:8px; color:var(--fg-2); background:#fff; border:1px solid var(--border-subtle); border-radius:14px; padding:10px; font-size:11.5px; font-weight:800; }
        .cap-balance-card { position:relative; }
        .cap-balance-card small { color:var(--fg-3); font-size:11px; }
        .cap-balance-card strong { display:block; font-size:23px; color:var(--fg-1); margin-top:2px; }
        .cap-balance-card button { position:absolute; right:10px; top:10px; border:0; background:#F7F7F3; border-radius:10px; width:30px; height:30px; }
        .cap-icon-button { display:flex; flex-direction:column; align-items:center; gap:5px; }
        .cap-icon-button.active { background:var(--brand-lime); border-color:var(--brand-lime-600); color:var(--brand-ink); box-shadow:0 8px 18px rgba(187,203,68,.22); }
        .cap-icon-button .lucide { width:17px; height:17px; }
        .cap-actions-two { flex-wrap:wrap; }
        .cap-actions-two button { min-width:0; }
        .cap-alias-card,.cap-account-card,.cap-account-sheet,.cap-action-note,.cap-section-line,.cap-show-all { background:#fff; border:1px solid var(--border-subtle); border-radius:16px; box-shadow:var(--shadow-xs); }
        .cap-alias-card { padding:12px; display:flex; flex-direction:column; gap:11px; }
        .cap-alias-main { display:flex; align-items:center; gap:10px; }
        .cap-pi-mark { width:42px; height:42px; border-radius:14px; background:#F5B328; color:#3B2502; display:grid; place-items:center; font-size:24px; line-height:1; font-weight:950; }
        .cap-alias-main div { flex:1; min-width:0; }
        .cap-alias-main small,.cap-alias-main em { display:block; color:var(--fg-3); font-size:10.8px; font-style:normal; }
        .cap-alias-main strong { display:block; color:var(--fg-1); font-size:15px; line-height:1.2; }
        .cap-alias-actions { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
        .cap-alias-actions button { display:flex; align-items:center; justify-content:center; gap:6px; border:1px solid var(--border-subtle); border-radius:12px; background:#F7F7F3; padding:9px; color:var(--fg-1); font-weight:850; font-size:11px; font-family:inherit; }
        .cap-alias-actions button.active { background:var(--brand-lime); border-color:var(--brand-lime-600); color:var(--brand-ink); }
        .cap-alias-actions .lucide { width:15px; height:15px; }
        .cap-action-note { padding:10px; display:flex; align-items:center; gap:8px; color:var(--fg-2); font-size:11.5px; font-weight:750; line-height:1.25; background:#FFFFFA; }
        .cap-action-note .lucide { width:16px; height:16px; color:var(--brand-ink); }
        .cap-section-line { padding:9px 10px; display:flex; align-items:center; justify-content:space-between; gap:8px; background:#FFFFFA; }
        .cap-section-line strong { color:var(--fg-1); font-size:12px; }
        .cap-section-line span { color:var(--fg-3); font-size:10px; font-weight:800; }
        .cap-show-all { padding:9px 12px; color:#9A6500; background:#FFF8E5; font-family:inherit; font-size:11.5px; font-weight:900; }
        .cap-account-card { padding:12px; display:grid; grid-template-columns:1fr auto 20px; align-items:center; gap:8px; }
        .cap-account-card.selected { border-color:rgba(187,203,68,.65); background:#FFFFFA; }
        .cap-account-card strong,.cap-account-row strong { display:block; color:var(--fg-1); font-size:13px; }
        .cap-account-card small,.cap-account-row small { display:block; color:var(--fg-3); font-size:10.8px; margin-top:2px; }
        .cap-account-card span,.cap-account-row b { color:var(--brand-ink); font-size:11.5px; font-weight:900; }
        .cap-account-sheet { padding:12px; display:flex; flex-direction:column; gap:8px; }
        .cap-account-sheet h3 { margin:0 0 2px; color:var(--fg-1); font-size:15px; }
        .cap-account-row { display:grid; grid-template-columns:34px 1fr auto; align-items:center; gap:8px; padding:9px; border-radius:13px; background:#F7F7F3; border:1px solid transparent; }
        .cap-account-row.active { background:#F1F5D7; border-color:rgba(187,203,68,.65); }
        .cap-account-row > span { width:34px; height:34px; display:grid; place-items:center; border-radius:12px; background:#0E1110; color:#BBCB44; font-weight:900; font-size:11px; }
        .cap-tx-avatar-wrap { position:relative; width:34px; height:34px; flex-shrink:0; }
        .cap-tx-row .cap-avatar { background:#F1F5D7; color:#3D4707; }
        .cap-tx-direction { position:absolute; right:-3px; bottom:-3px; width:15px; height:15px; border-radius:999px; display:grid; place-items:center; border:2px solid #fff; }
        .cap-tx-direction .lucide { width:8px; height:8px; stroke-width:3; }
        .cap-tx-direction.outgoing { background:#EF6A4A; color:#fff; }
        .cap-tx-direction.incoming { background:#46A760; color:#fff; }
        .cap-tx-row b { font-size:11.5px; color:#C8362D; }
        .cap-tx-row b.in { color:#2F8F4F; }
        .cap-tx-row b.neutral { color:var(--fg-3); }
        .cap-qr { width:156px; height:156px; display:grid; grid-template-columns:repeat(7,1fr); gap:5px; align-self:center; background:#fff; border:1px solid var(--border-subtle); border-radius:18px; padding:14px; position:relative; box-shadow:var(--shadow-xs); }
        .cap-qr span { border-radius:4px; background:#F4F4F1; }
        .cap-qr span.on { background:#0E1110; }
        .cap-qr img { position:absolute; width:42px; height:42px; object-fit:contain; left:50%; top:50%; transform:translate(-50%,-50%); background:#fff; border-radius:12px; padding:5px; }
        .cap-center-title { margin:0; text-align:center; color:var(--fg-1); font-size:16px; }
        .cap-center-sub { text-align:center; margin-top:-5px; }
        .cap-scan-frame { display:grid; place-items:center; gap:7px; min-height:86px; background:#101310; color:#fff; }
        .cap-scan-frame .lucide { color:var(--brand-lime); width:26px; height:26px; }
        .cap-search { display:flex; align-items:center; gap:8px; border:1px solid var(--border-subtle); border-radius:14px; background:#fff; padding:10px; color:var(--fg-3); font-size:11.5px; font-weight:700; }
        .cap-search span { flex:1; }
        .cap-search button { border:0; width:28px; height:28px; border-radius:9px; background:#F1F5D7; }
        .cap-section-title { margin:1px 2px -3px; color:var(--fg-1); font-size:13px; }
        .cap-error { margin:0; color:#C8362D; font-size:10.8px; font-weight:700; }
        .cap-detail-hero strong { display:block; font-size:24px; line-height:1; }
        .cap-detail-hero p,.cap-profile-head p { margin:3px 0; color:#F4F4F1; font-size:12px; }
        .cap-detail-hero small { color:#C5C5BC; font-size:11px; }
        .cap-profile-head h3 { margin:0; color:#fff; font-size:16px; }
        .cap-profile-head div { flex:1; }
        .cap-profile-head button { border:0; width:31px; height:31px; border-radius:10px; background:rgba(255,255,255,.12); color:#fff; }
        .cap-dialog { border-color:rgba(194,132,26,.3); background:#FFFCF2; }
        .cap-dialog strong { color:var(--fg-1); font-size:13px; }
        .cap-dialog p { color:var(--fg-3); font-size:11px; margin:4px 0 8px; }
        .cap-dialog div { display:flex; gap:8px; }
        @media (max-width: 640px) { .cap-grid { grid-template-columns:1fr; } }
      `}</style>
      <header className="mk-head">
        <div className="mk-eyebrow">PiSPI · Critères réglementaires</div>
        <h1 className="mk-title">Écrans d’application PiSPI par critère</h1>
        <p className="mk-lede">
          {PISPI_CAPTURE_SCREEN_TESTS.length} écrans de capture, basés sur {PISPI_CAPTURE_TESTS.length} critères CSV. Seule la vague sélectionnée est chargée dans le navigateur
          pour garder les captures fluides, avec des écrans d’application réalistes dans le contexte demandé.
        </p>
        <div className="cap-summary"><span><M_Icon name="list-checks" /> {PISPI_CAPTURE_TESTS.length} critères</span><span><M_Icon name="rows-3" /> Ordre CSV conservé</span><span><M_Icon name="file-spreadsheet" /> {architectureState.message}</span><span><M_Icon name="smartphone" /> {activeTests.length}/{activeRangeTotal} écrans visibles</span></div>
        <div className="mk-screen-tools">
          <span>{activeTests.length}/{activeRangeTotal} visibles dans la vague</span>
          <button type="button" className="mk-tool-button" onClick={resetTestOrder} disabled={!hasCustomOrder}>
            <M_Icon name="rotate-ccw" /> Réinitialiser l'ordre
          </button>
          <select defaultValue="" onChange={restoreFromSelect} aria-label="Réactiver un écran masqué">
            <option value="">{hiddenTests.length ? 'Réactiver un écran masqué' : 'Aucun écran masqué'}</option>
            {hiddenTests.map(test => (
              <option key={test[0]} value={test[0]}>#{pad(test[0])} · {test[1]}</option>
            ))}
            {hiddenTests.length > 0 && <option value="__all">Tout réactiver</option>}
          </select>
        </div>
        <div className="cap-export-row">
          <button type="button" className="cap-export-range" onClick={exportActiveRange} disabled={exportState.busy}>
            <M_Icon name="download" /> Exporter la vague en PNG
          </button>
          <button type="button" className="cap-export-range all" onClick={exportAllScreens} disabled={exportState.busy}>
            <M_Icon name="archive" /> Exporter tous les écrans
          </button>
          <span className="cap-export-status">{exportState.message || 'Fichiers nommés depuis architecture.csv quand disponible. Téléphone seul avec marge.'}</span>
        </div>
        <nav className="cap-range-nav">
          {ranges.map(r => (
            <button key={r.start} type="button" className={r.start === activeRange.start ? 'active' : ''} onClick={() => showRange(r)}>
              #{pad(r.start)}–#{pad(r.end)}
            </button>
          ))}
        </nav>
      </header>

      <section className="mk-section" id={`tests-${activeRange.start}-${activeRange.end}`}>
        <div className="mk-section-head">
          <div className="num">{pad(activeRange.start)}</div>
          <div className="body"><h2>Critères #{pad(activeRange.start)} à #{pad(activeRange.end)}</h2><p>Ordre identique au fichier CSV source.</p></div>
          <div className="count">{activeTests.length}/{activeRangeTotal} écrans</div>
        </div>
        <div
          className={`cap-grid ${dragTarget && !dragTarget.beforeId ? 'is-drop-zone' : ''}`}
          data-test-range={`${activeRange.start}-${activeRange.end}`}
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event)}
        >
          {activeTests.map(test => <TestPhone key={test[0]} test={test} onDownload={downloadOne} onHide={hideTest} />)}
          {!activeTests.length && <div className="mk-empty-section">Tous les écrans de cette vague sont masqués.</div>}
        </div>
      </section>
    </div>
  );
};

window.PiSPITestCaptures = PiSPITestCaptures;
