<?php


function formatDateToBR($date) {
    $date = trim($date);

    if (empty($date) || $date === '0000-00-00') {
        return '';
    }

    // Pega apenas a parte da data, ignorando hora se existir
    $dateOnly = explode(' ', $date)[0];

    // Se estiver no formato YYYY-MM-DD
    if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $dateOnly)) {
        list($year, $month, $day) = explode('-', $dateOnly);
        return "$day/$month/$year";
    }

    return $date;
}

function formatDateToISO($date) {
    $date = trim($date);

    if (empty($date) || $date === '0000-00-00') {
        return null;
    }

    // Tenta separar dia/mês/ano
    $parts = explode('/', $date);
    if (count($parts) === 3) {
        $day = str_pad($parts[0], 2, '0', STR_PAD_LEFT);
        $month = str_pad($parts[1], 2, '0', STR_PAD_LEFT);
        $year = $parts[2];

        // Corrige ano com 2 dígitos
        if (strlen($year) === 2) {
            $year = ($year >= 50) ? "19$year" : "20$year";
        }

        // Garante que é uma data válida
        if (checkdate((int)$month, (int)$day, (int)$year)) {
            return "$year-$month-$day";
        }
    }

    // Se já vier no formato correto
    if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
        return $date;
    }

    return null;
}


function formatDateAndHoursToBR($date) {
    $date = trim($date);

    if (empty($date) || $date === '0000-00-00' || $date === '0000-00-00 00:00:00') {
        return '';
    }

    // Separa data e hora
    $parts = explode(' ', $date);
    $dateOnly = $parts[0];
    $timeOnly = $parts[1] ?? '';

    // Converte a data para DD/MM/YYYY
    list($year, $month, $day) = explode('-', $dateOnly);
    $dateOnly = "$day/$month/$year";

    // Se hora existir, adiciona no retorno
    return $timeOnly ? "$dateOnly $timeOnly" : $dateOnly;
}