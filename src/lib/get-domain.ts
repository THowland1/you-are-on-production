export function getDomain(url: URL) {
    const domain_parts = url.hostname.split('.');
    let tld_index = domain_parts.length - 1;
    if (domain_parts.includes('com')) {
        tld_index = domain_parts.indexOf('com')
    }
    if (domain_parts.includes('co')) {
        tld_index = domain_parts.indexOf('co')
    }


    return domain_parts.slice(tld_index - 1).join('.');
}