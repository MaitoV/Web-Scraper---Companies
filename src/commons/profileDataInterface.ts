export interface ProfileDataI {
    nombre: string;
    nombreDeFantasía: string;
    pais: string;
    tipoDePerfil: string;
    CUIT: string;
    actividadISICPrincipal: string | undefined;
    actividadPrincipalAFIP: string | undefined;
    perfildeComercialización: string | undefined;
    fechadeContratoSocial: string | undefined;
    facturaciónEstimada: string | undefined;
    cantidaddeEmpleados: string | undefined;
    usuarioResponsable: string | undefined;
    domicilio: string | undefined;
    teléfonos: string | undefined;
    sitios: string | undefined;
    redesSociales: string | undefined;
}

export interface ProfileDataExtendI extends ProfileDataI {
    perfilComprador?: Array<string>;
    perfilVendedor?: Array<string>;
}
