from algoliasearch_django import algolia_engine


def get_client():
    return algolia_engine.client


def get_index(index_name="Contenir"):
    client = get_client()
    index = client.init_index(index_name)
    return index

def perform_search(query,**kwargs):
    index = get_index()
    params = {}
    NomChamp = ""
    if NomChamp in kwargs:
        NomChamp.pop("NomChamp") or []
    if len(NomChamp) != 0:
        params['NomChampFilters'] = NomChamp
    index_filters = [f"{k}:{v}" for k, v in kwargs.items() if v]

    if len(index_filters) !=0:
        params['facetFilters'] = index_filters
    result = index.search(query, params)
    return result