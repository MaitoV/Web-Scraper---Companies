export interface ProfileDataI {
    nombre: string;
    nombredefantasia: string;
    pais: string;
    tipoDePerfil: string;
    cuit: string;
    actividadisicprincipal: string | undefined;
    actividadprincipalafip: string | undefined;
    perfildecomercializacion: string | undefined;
    fechadecontratosocial: string | undefined;
    facturacionestimada: string | undefined;
    cantidaddeempleados: string | undefined;
    usuarioresponsable: string | undefined;
    domicilio: string | undefined;
    telefonos: string | undefined;
    sitios: string | undefined;
    redessociales: string | undefined;
}

export interface ProfileDataExtendI extends ProfileDataI {
    perfilcomprador?: Array<string>;
    perfilvendedor?: Array<string>;
    exportador?: boolean;
}
