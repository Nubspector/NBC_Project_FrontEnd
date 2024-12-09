// CustomerCardPDF.js
import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import { NBC } from "../../../public/img";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        fontSize: 12,
    },
    container: {
        border: "1px solid #666",
        padding: 20,
        borderRadius: 10,
        width: "100%",
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginBottom: 20,
    },
    headerText: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        color: "#E91E63",
        fontWeight: "black",
    },
    address: {
        fontSize: 10,
        color: "#666",
    },
    cardNumber: {
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 2,
        textAlign: "center",
        marginVertical: 10,
    },
    holderInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    customerName: {
        textAlign: "left",
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginVertical: 10,
    },
    expirationNotice: {
        textAlign: "right",
        fontSize: 8,
        color: "#666",
    },
});

const CustomerCardPDF = ({ customer }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image src={NBC} style={{ width: 80, height: 80, marginBottom: 5, marginRight:20 }} />
                    <View style={styles.headerText}>
                        <Text style={styles.title}>Natural Beauty Center</Text>
                        <Text style={styles.address}>Jl. Babarsari No. 43 Yogyakarta 55281</Text>
                        <Text style={styles.address}>Telp. (0274) 487711</Text>
                    </View>
                </View>

                <Text style={styles.cardNumber}>{customer?.card_id}</Text>

                <View style={styles.holderInfo}>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>Card Holder Since</Text>
                        <Text>Month / Year</Text>
                        <Text>{`${customer?.month_register} / ${customer?.year_register}`}</Text>
                    </View>
                </View>

                <Text style={styles.customerName}>{customer?.name}</Text>

                <Text style={styles.expirationNotice}>
                    Your NBC Card has no expiration date
                </Text>
            </View>
        </Page>
    </Document>
);

export default CustomerCardPDF;
