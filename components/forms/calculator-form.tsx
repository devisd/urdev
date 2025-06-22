"use client"

import { useState, useEffect } from "react"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const pageOptions = [
    { value: "1", label: "1", cost: 30000 },
    { value: "up-to-5", label: "До 5", cost: 60000 },
    { value: "up-to-15", label: "До 15", cost: 80000 },
    { value: "more-than-15", label: "15 и более", cost: "negotiable" },
]

const designOptions = [
    { value: "no", label: "Нет", cost: 24750 },
    { value: "yes", label: "Да", cost: "negotiable" },
]

const analyticsOptions = [
    { value: "no", label: "Нет", cost: 0 },
    { value: "yes", label: "Да", cost: 5000 },
]

const crmOptions = [
    { value: "no", label: "Нет", cost: 0 },
    { value: "yes", label: "Да", cost: 5000 },
]

const cmsElementOptions = [
    { value: "1", label: "1", cost: 2500 },
    { value: "2", label: "2", cost: 5000 },
    { value: "3", label: "3", cost: 7500 },
    { value: "4", label: "4", cost: 10000 },
    { value: "5", label: "5", cost: 12500 },
]

export function CalculatorForm() {
    const [pages, setPages] = useState(pageOptions[0].value)
    const [design, setDesign] = useState(designOptions[0].value)
    const [analytics, setAnalytics] = useState(analyticsOptions[0].value)
    const [crm, setCrm] = useState(crmOptions[0].value)
    const [cmsElements, setCmsElements] = useState("0")

    const [totalCost, setTotalCost] = useState("")

    useEffect(() => {
        let isNegotiable = false
        let currentCost = 0

        const selectedPages = pageOptions.find(p => p.value === pages)
        if (selectedPages) {
            if (typeof selectedPages.cost === "number") {
                currentCost += selectedPages.cost
            } else {
                isNegotiable = true
            }
        }

        const selectedDesign = designOptions.find(d => d.value === design)
        if (selectedDesign) {
            if (typeof selectedDesign.cost === "number") {
                currentCost += selectedDesign.cost
            } else {
                isNegotiable = true
            }
        }

        const selectedAnalytics = analyticsOptions.find(a => a.value === analytics)
        if (selectedAnalytics && typeof selectedAnalytics.cost === "number") {
            currentCost += selectedAnalytics.cost
        }

        const selectedCrm = crmOptions.find(c => c.value === crm)
        if (selectedCrm && typeof selectedCrm.cost === "number") {
            currentCost += selectedCrm.cost
        }

        if (crm === "yes" && cmsElements !== "0") {
            const selectedCms = cmsElementOptions.find(c => c.value === cmsElements)
            if (selectedCms) {
                currentCost += selectedCms.cost
            }
        }

        if (isNegotiable) {
            setTotalCost("Договорная")
        } else {
            const finalCost = Math.ceil(currentCost / 1000) * 1000
            setTotalCost(`${finalCost.toLocaleString("ru-RU")} ₽`)
        }
    }, [pages, design, analytics, crm, cmsElements])

    useEffect(() => {
        if (crm === "no") {
            setCmsElements("0")
        }
    }, [crm])

    return (
        <Card className="w-full pt-6 max-w-2xl mx-auto">
            <CardContent>
                <form className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-1">
                        <div className="space-y-2">
                            <Label htmlFor="pages">Количество страниц</Label>
                            <p className="text-sm text-muted-foreground">
                                Сколько должно быть страниц на сайте?
                            </p>
                            <Select value={pages} onValueChange={setPages}>
                                <SelectTrigger id="pages">
                                    <SelectValue placeholder="Выберите количество" />
                                </SelectTrigger>
                                <SelectContent>
                                    {pageOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="design">Индивидуальный дизайн</Label>
                            <p className="text-sm text-muted-foreground">
                                Необходим уникальный дизайн с "Вау эффектом"?
                            </p>
                            <Select value={design} onValueChange={setDesign}>
                                <SelectTrigger id="design">
                                    <SelectValue placeholder="Выберите опцию" />
                                </SelectTrigger>
                                <SelectContent>
                                    {designOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="analytics">Система аналитики</Label>
                            <p className="text-sm text-muted-foreground">
                                Планируете ли Вы собирать данные о посетителях сайта?
                            </p>
                            <Select value={analytics} onValueChange={setAnalytics}>
                                <SelectTrigger id="analytics">
                                    <SelectValue placeholder="Выберите опцию" />
                                </SelectTrigger>
                                <SelectContent>
                                    {analyticsOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="crm">Интеграция CRM</Label>
                            <p className="text-sm text-muted-foreground">
                                Понадобится отправка заявок в Вашу CRM систему?
                            </p>
                            <Select value={crm} onValueChange={setCrm}>
                                <SelectTrigger id="crm">
                                    <SelectValue placeholder="Выберите опцию" />
                                </SelectTrigger>
                                <SelectContent>
                                    {crmOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cms-elements">
                                Элементы, связанные с CMS
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Мы добавим личный кабинет, через который Вы сможете изменять
                                содержимое сайта. Какое количество элементов должны быть
                                редактируемыми?
                            </p>
                            <Select value={cmsElements} onValueChange={setCmsElements}>
                                <SelectTrigger id="cms-elements">
                                    <SelectValue placeholder="Выберите количество" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cmsElementOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="pt-6 text-2xl font-bold text-center md:text-3xl">
                        <span className="text-muted-foreground">Итоговая стоимость: </span>
                        <span className="text-primary">{totalCost}</span>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
} 