import axios from "axios";
export function getAllInstitutes() {
return new Promise((resolve, reject) => {
//AGU: http://localhost:3000/api/v1/institutos
axios.get(import.meta.env.VITE_GET_ALL_INSTITUTES_URL)
.then((response) => {
const data = response.data;
if (!data.success) {
console.error("No se pudo realizar correctamente la petición <<getAllInstitutes - Services>>", data);
reject(data);
} else if (!data.data || data.data.length === 0) {
console.info(" 🛈  No se encontraron documentos en <<cat_institutos>>");
resolve([]);
} else if (data.success) {
const InstitutesData = data.data;
console.log("Colección: <<cat_institutos>>", InstitutesData);
resolve(JSON.parse(JSON.stringify(InstitutesData)));
}
})
.catch((error) => {
console.error("Error en <<getAllInstitutes - Services>>", error);
reject(error);
});
});
}