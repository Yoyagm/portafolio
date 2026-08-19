# CV en LaTeX. Requiere tectonic (brew install tectonic): descarga los paquetes
# que necesita, así que no hace falta una instalación completa de TeX Live.
#
#   make          compila los cuatro generales, comprueba y publica en public/cv/
#   make build    solo compila los generales
#   make check    comprueba que las versiones de 1 página siguen cabiendo en 1
#   make dirigidos  compila los CV dirigidos a una vacante (carpeta privada)
#   make clean    borra los PDF generados y los intermedios
#
# Todos comparten cv-preamble.tex. Los cuerpos son cv-body.tex (EN) y
# cv-body-es.tex (ES); los wrappers solo fijan variante e idioma.
# EN y ES no se traducen solos: al cambiar contenido, cambiar los dos.

EN_ONE   := johan-rodriguez-cv-onepage.pdf
EN_FULL  := johan-rodriguez-cv.pdf
ES_ONE   := johan-rodriguez-cv-es-onepage.pdf
ES_FULL  := johan-rodriguez-cv-es.pdf

ONEPAGERS := $(EN_ONE) $(ES_ONE)
ALL_PDF   := $(EN_ONE) $(EN_FULL) $(ES_ONE) $(ES_FULL)

PREAMBLE := cv-preamble.tex
BODY_EN  := cv-body.tex
BODY_ES  := cv-body-es.tex

PUB := ../public/cv

.PHONY: all build publish check dirigidos clean

all: publish

build: $(ALL_PDF)

$(EN_ONE): johan-rodriguez-cv-onepage.tex $(BODY_EN) $(PREAMBLE)
	tectonic johan-rodriguez-cv-onepage.tex

$(EN_FULL): johan-rodriguez-cv.tex $(BODY_EN) $(PREAMBLE)
	tectonic johan-rodriguez-cv.tex

$(ES_ONE): johan-rodriguez-cv-es-onepage.tex $(BODY_ES) $(PREAMBLE)
	tectonic johan-rodriguez-cv-es-onepage.tex

$(ES_FULL): johan-rodriguez-cv-es.tex $(BODY_ES) $(PREAMBLE)
	tectonic johan-rodriguez-cv-es.tex

# Una versión "de una página" que ocupa dos ha perdido su razón de ser.
check: $(ONEPAGERS)
	@for f in $(ONEPAGERS); do \
	  n=$$(pdfinfo $$f | awk '/^Pages:/ {print $$2}'); \
	  if [ "$$n" != "1" ]; then \
	    echo "FALLO: $$f tiene $$n páginas, debe tener 1. Recorta contenido, no interlineado."; \
	    exit 1; \
	  fi; \
	  echo "OK: $$f cabe en 1 página."; \
	done

publish: build check
	cp $(EN_ONE)  $(PUB)/Johan-Rodriguez-Security-Engineer.pdf
	cp $(EN_FULL) $(PUB)/Johan-Rodriguez-Security-Engineer-detailed.pdf
	cp $(ES_ONE)  $(PUB)/Johan-Rodriguez-Ingeniero-Seguridad.pdf
	cp $(ES_FULL) $(PUB)/Johan-Rodriguez-Ingeniero-Seguridad-detallado.pdf
	@echo "→ publicados 4 PDF en $(PUB)/"

# Carpeta privada, fuera de git: un CV por vacante. Ver dirigidos/LEEME.md.
dirigidos:
	@for f in dirigidos/johan-rodriguez-cv-*.tex; do \
	  echo "→ $$f"; (cd dirigidos && tectonic $$(basename $$f)); \
	done

clean:
	rm -f *.pdf *.aux *.log *.out dirigidos/*.pdf dirigidos/*.aux dirigidos/*.log
