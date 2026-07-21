const API_URL = "http://localhost:3001";

export async function getWorksheets() { 
    const response = await fetch(`${API_URL}/api/tenants`);
    
    if (!response.ok){
        throw new Error("Failed to fetch Worksheets");
    }
    return response.json();
}
