import {PrismaClient} from "@prisma/client";
const db=new PrismaClient();
async function main(){
 await db.article.upsert({where:{slug:"how-to-start-a-monthly-budget-in-india"},update:{},create:{
 title:"How to Start a Monthly Budget in India",slug:"how-to-start-a-monthly-budget-in-india",
 excerpt:"A beginner-friendly framework to understand income, expenses, savings and monthly money goals.",
 category:"Budgeting",status:"PUBLISHED",featured:true,publishedAt:new Date(),
 seoTitle:"How to Start a Monthly Budget in India | Dabbulu Kavali",
 seoDescription:"Learn a simple monthly budgeting method, track expenses and build a savings habit.",
 content:"A monthly budget is a simple plan for how you will use the money you receive. It helps you understand spending and make room for savings.\\n## 1. Calculate your take-home income\\nStart with the amount that actually reaches your bank account after deductions. If your income changes each month, use a conservative estimate.\\n## 2. List essential expenses\\nWrite down rent, groceries, utilities, transport, education, insurance premiums and required loan payments. Review bank statements so you do not forget small recurring expenses.\\n## 3. Set a realistic savings goal\\nChoose an amount you can maintain. Automating a transfer after salary day may help, but keep enough money for essentials and emergencies.\\n## 4. Review weekly\\nCompare planned and actual spending once a week. Adjust the plan without relying on unrealistic restrictions.\\n## Important note\\nThis is general financial education, not individualized financial advice. Product terms, tax rules and eligibility can change; confirm important details with official sources."
 }});
}
main().finally(()=>db.$disconnect());
