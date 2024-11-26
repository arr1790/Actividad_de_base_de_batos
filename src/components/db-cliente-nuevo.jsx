import mysql from "@/lib/mysql"
import { revalidatePath } from "next/cache"


async function clienteNuevo(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const domicilio = formData.get('domicilio')
    const fecha_nacimiento = formData.get('fecha_nacimiento')
    console.log(fecha_nacimiento)

    const sql = 'insert into `clientes` (`nombre`, `domicilio`, `fecha_nacimiento`) values (?, ?, ?)'
    const values = [nombre, domicilio, fecha_nacimiento];

    const [result, fields] = await mysql.query(sql, values)
    revalidatePath('/clientes')
}



function ClienteNuevo() {
    return (
        <form className='my-10 grid grid-cols-[150px_auto] gap-4'>

            <label htmlFor='nombre'>Nombre</label>
            <input required id='nombre' name='nombre' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='domicilio'>Domicilio:</label>
            <input required id='domicilio' name='domicilio' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='fecha_nacimiento'>fecha Nacimiento</label>
            <input required id='fecha_nacimiento' name='fecha_nacimiento' type='date'  className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <div className='col-span-2 grid gap-2'>
                <button formAction={clienteNuevo} className='bg-green-600 text-white px-4 py-2 rounded-xl'>
                    Guardar cliente
                </button>
                <button type='reset' className='bg-slate-600 text-white px-4 py-2 rounded-xl'>
                    Limpiar campos
                </button>
            </div>
        </form>
    );
}

export default ClienteNuevo;