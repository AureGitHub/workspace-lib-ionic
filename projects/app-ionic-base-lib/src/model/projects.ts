export default [
    {

        id: 1,
        estado : 'baja',
        name: 'Proyecto 1',
        children: [
            {
                id: 11,
                descripcion: 'Ayuntamiento de Madrid medio ambiente primero',
                children: [
                    {
                        id: 111,
                        descripcion: 'Level 1-1'
                    },
                    {
                        id: 112,
                        descripcion: 'Level 1-2',
                        children: [
                            {
                                id: 1121,
                                descripcion: 'Level 1-2-1'
                            },
                            {
                                id: 1122,
                                descripcion: 'Level 1-2-2',
                                children: [
                                    {
                                        id: 11221,
                                        descripcion: 'Policía de Getafe'
                                    },
                                    {
                                        id: 11222,
                                        descripcion: 'Arquitecto de no se que'
                                    },
                                    {
                                        id: 11223,
                                        descripcion: 'Ayuntamiento de Getafe'
                                    },
                                    {
                                        id: 11224,
                                        descripcion: 'Ayuntamiento de Madrid. Medio ambiente Villaverde a bajo y de arriba'
                                    }
                                ]
                            },
                            {
                                id: 1123,
                                descripcion: 'Level 1-2-3'
                            }
                        ]
                    },
                    {
                        id: 113,
                        descripcion: 'Level 1-3'
                    }
                ]
            },
            {
                id: 12,
                descripcion: 'Ayuntamiento de Getafe medio ambiente segundo',
                background: 'blue',
                color: 'white'
            },
            {
                id: 13,
                descripcion: 'Ayuntamiento de Leganés medio ambiente tercero',
                children: [
                    {
                        id: 131,
                        descripcion: 'Level 3-1'
                    },
                    {
                        id: 132,
                        descripcion: 'Level 3-2'
                    },
                    {
                        id: 133,
                        descripcion: 'Level 3-3'
                    }
                ]
            }
        ]
    },

    {
        id: 2,
        estado : 'alta',
        name: 'Proyecto 2',
        children: []
    }

]

